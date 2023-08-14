import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository} from 'typeorm';
import { Rooms } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Rooms) private roomsRepo: Repository<Rooms>) {}

  async create(createRoomDto: CreateRoomDto, hotelId: number, res) {
    try {
      const room = this.roomsRepo.create({
        img_rooms: createRoomDto.img_rooms,
        price_room: createRoomDto.price_room,
        capacity: createRoomDto.capacity,
        description: createRoomDto.description,
        direction: createRoomDto.direction,
        amenities: createRoomDto.amenities,
        floor_area: createRoomDto.floor_area,
        status_room: createRoomDto.status_room,
        name_room: createRoomDto.name_room,
        hotels: { hotel_Id: hotelId }
      });
      await this.roomsRepo.save(room);
      return res.status(200).json({
        messager : "Thêm phòng thành công",
        room
      });
    } catch (error) {
      throw new Error(`Could not create room: ${error.message}`);
    }
  }

  async findAll(res) {
    try {
      let getAll = await this.roomsRepo.find();
      return res.status(200).json({
        messager: 'lấy phòng thành công',
        getAll,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getRoomDetailById(id: number, res) {
    try {
      const rooms = await this.roomsRepo.query(
        `SELECT * FROM rooms 
        INNER JOIN hotels ON rooms.hotel_id = hotels.hotel_Id 
        WHERE hotels.hotel_Id = ?`,
        [id],
      );
      return res.status(200).json({
        message: 'Lấy thành công',
        rooms,
      });
    } catch (error) {
      console.log(error);
      return {
        message: 'Đã xảy ra lỗi',
        status: 500,
        error: error.message,
      };
    }
  }

  update(id: number, updateRoomDto: UpdateRoomDto, res) {
    return `This action updates a #${id} room`;
  }

  remove(id: number, res) {
    try {
      let find
    } catch (error) {
      
    }
  }
}
