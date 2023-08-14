import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookingRoomService } from './booking_room.service';
import { BookingRoomController } from './booking_room.controller';
import { BookingRoom } from './entities/booking_room.entity';

@Module({
  imports : [TypeOrmModule.forFeature([BookingRoom])],
  controllers: [BookingRoomController],
  providers: [BookingRoomService]
})
export class BookingRoomModule {}
