import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { BookingRoomService } from './booking_room.service';
import { CreateBookingRoomDto } from './dto/create-booking_room.dto';
import { UpdateBookingRoomDto } from './dto/update-booking_room.dto';

@Controller('booking-room')
export class BookingRoomController {
  constructor(private readonly bookingRoomService: BookingRoomService) {}

  @Post()
  create(@Body() createBookingRoomDto: any , @Res() res: Response) {
    return this.bookingRoomService.createBooking(createBookingRoomDto , res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.bookingRoomService.findAll(res);
  }

  @Get('/UserId')
  find( @Res() res: Response) {
    return this.bookingRoomService.find(res);
  }

  @Get('/RoomId/:rooms_id')
  getBookingsByRoomId(@Param('rooms_id') rooms_id: string, @Res() res: Response) {
    return this.bookingRoomService. getBookingsByRoomId(+rooms_id , res);
  }

  @Get('/UserId/:userId')
  getBookingsByUserId(@Param('userId') userId: string, @Res() res: Response) {
    return this.bookingRoomService. getBookingsByUserId(+userId , res);
  }


  @Delete(':id')
  remove(@Param('id') id: string , @Res() res: Response) {
    return this.bookingRoomService.remove(+id , res);
  }

}

