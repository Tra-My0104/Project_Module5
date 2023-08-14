import { InjectConnection, InjectRepository } from '@nestjs/typeorm/dist/common';
import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository ,Connection } from 'typeorm';
import { Rooms } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Rooms) private roomsRepo: Repository<Rooms>, 
  @InjectConnection()
  private connection: Connection, ) {}

  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  async findAll() {
    try {
      return await this.roomsRepo.find({});
    } catch (error) {
      console.log(error)
    }
    
  }

  async getRoomDetailById(id: number): Promise<any> {
    try {
      const hotelResult = await this.connection.query(`
        SELECT * FROM rooms 
        INNER JOIN hotels ON rooms.hotel_id = hotels.hotel_Id 
        WHERE hotels.hotel_Id = ${id}
      `);
      return {
        message: 'Lấy thành công',
        status: 200,
        data: hotelResult[0],
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Đã xảy ra lỗi',
        status: 500,
        error: error.message,
      };
    }
  }
}

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
