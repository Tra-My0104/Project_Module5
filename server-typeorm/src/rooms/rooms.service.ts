import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository} from 'typeorm';
import { Rooms } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Rooms) private roomsRepo: Repository<Rooms>) {}

  async create(createRoomDto: CreateRoomDto, res) {
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
        hotels: { hotel_Id: createRoomDto.hotels }
      });
      await this.roomsRepo.save(room);
      return res.status(200).json({
        messager : "Thêm phòng thành công",
        room
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findOneRooms (id : number , res){
    try {
      let findRoom = await this.roomsRepo.findOne({where : {rooms_id : id}})
      if(!findRoom){
        throw new NotFoundException('Không tìm được phòng');
      }
      return res.status(200).json({
        messager : "Lấy thành công",
        findRoom
      })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(res) {
    try {
      let getAll = await this.roomsRepo.createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.hotels', 'hotel') // LEFT JOIN và chọn dữ liệu từ bảng Hotels
      .select([
        'rooms.rooms_id',
        'rooms.direction',
        'rooms.capacity',
        'rooms.description',
        'rooms.floor_area',
        'rooms.amenities',
        'rooms.price_room',
        'rooms.status_room',
        'rooms.img_rooms',
        'rooms.name_room',
        'hotel.nameRoom' // Chọn trường name_room từ bảng Hotels
      ])
      .getMany();
  
      return res.status(200).json({
        message: 'Lấy phòng thành công',
        getAll,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findByHotelId(nameRoom: string , res) {
    try {
      const rooms = await this.roomsRepo
      .createQueryBuilder('rooms')
      .leftJoinAndSelect('rooms.hotels', 'hotel')
      .where('hotel.nameRoom LIKE :hotelName', { hotelName: `%${nameRoom}%` })
      .getMany();
      return res.status(200).json({
        message: 'Tìm phòng thành công',
        rooms,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
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

  async update(id: number, updateRoomDto: UpdateRoomDto, res) {
   try {
    let findRoom = await this.roomsRepo.findOne({where : {rooms_id : id}})
    if(!findRoom){
      throw new NotFoundException('Không tìm được phòng');
    }
    findRoom.amenities = updateRoomDto.amenities;
    findRoom.capacity = updateRoomDto.capacity;
    findRoom.description = updateRoomDto.description;
    findRoom.direction = updateRoomDto.direction;
    findRoom.img_rooms = updateRoomDto.img_rooms;
    findRoom.name_room = updateRoomDto.name_room;
    findRoom.price_room = updateRoomDto.price_room;
    findRoom.floor_area = updateRoomDto.floor_area
    await this.roomsRepo.save(findRoom);
    return res.status(200).json({
      messager : "Update phòng thành công",
      findRoom
    })
   } catch (error) {
    console.log(error);
    throw new BadRequestException(error);
   }
  }

  async updateStatus(id: number, res){
    try {
      let findRoom = await this.roomsRepo.findOne({where : {rooms_id : id}})
      if(!findRoom){
        throw new NotFoundException('Không tìm được phòng');
      }
      findRoom.status_room = 1
      await this.roomsRepo.save(findRoom);
      return res.status(200).json({
        messager : "Update trạng thái thành công",
        findRoom
      })
     } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
     }
  }

  async updateStatus_1(id: number, res){
    try {
      let findRoom = await this.roomsRepo.findOne({where : {rooms_id : id}})
      if(!findRoom){
        throw new NotFoundException('Không tìm được phòng');
      }
      findRoom.status_room = 2
      await this.roomsRepo.save(findRoom);
      return res.status(200).json({
        messager : "Update trạng thái thành công",
        findRoom
      })
     } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
     }
  }
  
  async updateStatus_2(id: number, res){
    try {
      let findRoom = await this.roomsRepo.findOne({where : {rooms_id : id}})
      if(!findRoom){
        throw new NotFoundException('Không tìm được phòng');
      }
      findRoom.status_room = 3
      await this.roomsRepo.save(findRoom);
      return res.status(200).json({
        messager : "Update trạng thái thành công",
        findRoom
      })
     } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
     }
  }
  
  async updateStatus_3(id: number, res){
    try {
      let findRoom = await this.roomsRepo.findOne({where : {rooms_id : id}})
      if(!findRoom){
        throw new NotFoundException('Không tìm được phòng');
      }
      findRoom.status_room = 0
      await this.roomsRepo.save(findRoom);
      return res.status(200).json({
        messager : "Update trạng thái thành công",
        findRoom
      })
     } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
     }
  }

  async remove(id: number, res) {
    try {
      let findRoom = await this.roomsRepo.findOne({where : {rooms_id : id}})
      if(!findRoom){
        throw new NotFoundException('Không tìm được phòng');
      }
      await this.roomsRepo.remove(findRoom)
      return res.status(200).json({
        messager : "Xóa thành công",
      })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
