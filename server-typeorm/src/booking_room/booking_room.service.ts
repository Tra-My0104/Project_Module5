import { InjectRepository } from '@nestjs/typeorm/dist/common';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingRoomDto } from './dto/create-booking_room.dto';
import { UpdateBookingRoomDto } from './dto/update-booking_room.dto';
import { BookingRoom } from './entities/booking_room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingRoomService {
  constructor(
    @InjectRepository(BookingRoom)
    private bookingroomRepo: Repository<BookingRoom>,
  ) {}

  async createBooking(createBookingRoomDto : any, res) {
    try {
      const newBooking = await this.bookingroomRepo.create({
        total_price : createBookingRoomDto.total_price,
        check_in_date : createBookingRoomDto.check_in_date,
        check_out_date : createBookingRoomDto.check_out_date,
        number_night : createBookingRoomDto.number_night,
        UserId : createBookingRoomDto.UserId,
        rooms_id : createBookingRoomDto.rooms_id
      });
      await this.bookingroomRepo.save(newBooking)
      return res.status(200).json({
        messager : "thêm booking thành công",
        newBooking
      })
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(res) {
    try {
      const queryBuilder = this.bookingroomRepo
        .createQueryBuilder('booking_room')
        .leftJoinAndSelect('booking_room.users', 'users')
        .innerJoin('booking_room.rooms', 'rooms')
        .leftJoinAndSelect('rooms.hotels', 'hotels')
        .select([
          'rooms.rooms_id',
          'users.UserName',
          'hotels.nameRoom',
          'rooms.status_room',
          'rooms.name_room',
          'booking_room.check_in_date',
          'booking_room.check_out_date',
          'booking_room.number_night',
          'booking_room.total_price',
          'booking_room.booking_room_id'
        ]);
      const result_data = await queryBuilder.getMany();
      return res.status(200).json({
        messager: 'Lấy thành công',
        result_data,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async getBookingsByRoomId(rooms_id: number , res: any){
    try {
     let result = await this.bookingroomRepo
      .createQueryBuilder('booking_room')
      .innerJoin('booking_room.rooms', 'rooms')
      .innerJoin('rooms.hotels', 'hotels')
      .innerJoin('booking_room.users', 'users')
      .select([
        'rooms.name_room',
        'hotels.nameRoom',
        'hotels.location',
        'rooms.rooms_id',
        'rooms.status_room',
        'booking_room.check_in_date',
        'booking_room.check_out_date',
        'booking_room.number_night',
        'booking_room.total_price',
        'booking_room.booking_room_id',
        'booking_room.UserId'
      ])
      .where('booking_room.rooms_id = :rooms_id', { rooms_id })
      .getRawMany();
      return res.status(200).json({
         messager : "lấy tất cả theo UserId thành công",
         data : result
      })
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error);
    }
  }

  async getBookingsByUserId(userId: number , res: any){
    try {
     let result = await this.bookingroomRepo
      .createQueryBuilder('booking_room')
      .innerJoin('booking_room.rooms', 'rooms')
      .innerJoin('rooms.hotels', 'hotels')
      .innerJoin('booking_room.users', 'users')
      .select([
        'rooms.name_room',
        'hotels.nameRoom',
        'hotels.location',
        'rooms.rooms_id',
        'rooms.status_room',
        'booking_room.check_in_date',
        'booking_room.check_out_date',
        'booking_room.number_night',
        'booking_room.total_price',
        'booking_room.booking_room_id',
        'booking_room.UserId'
      ])
      .where('booking_room.UserId = :userId', { userId })
      .getRawMany();
      return res.status(200).json({
         messager : "lấy tất cả theo UserId thành công",
         data : result
      })
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error);
    }
  }

  async find(res) {
    try {
     let find = await this.bookingroomRepo.find()
      return res.status(200).json({
        messager: 'Lấy thành công',
        find
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }


  async remove(id: number, res) {
    try {
      let findBooking = await this.bookingroomRepo.findOne({
        where: { booking_room_id: id },
      });
      if (!findBooking) {
        throw new NotFoundException('Không tìm được booking');
      }
      await this.bookingroomRepo.remove(findBooking);
      return res.status(200).json({
        messager : "Xóa thành công"
      })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
