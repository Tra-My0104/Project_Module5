import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository ,Connection } from 'typeorm';
import { Rooms } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Rooms) private roomsRepo: Repository<Rooms> ) {}

  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  async findAll(res) {
    try {
      return await this.roomsRepo.find({});
    } catch (error) {
      console.log(error)
    }
    
  }

  async getRoomDetailById(id: number , res) {
    try {
      const rooms = await this.roomsRepo.query( `SELECT * FROM rooms 
        INNER JOIN hotels ON rooms.hotel_id = hotels.hotel_Id 
        WHERE hotels.hotel_Id = ?` , [id])
      return res.status(200).json({
        message: 'Lấy thành công',
        status: 200,
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


  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
