import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/user.entity';
import { HotelsModule } from './hotels/hotels.module';
import { Hotels } from './hotels/entities/hotel.entity';
import { RoomsModule } from './rooms/rooms.module';
import { Rooms } from './rooms/entities/room.entity';
import { ImgDetailModule } from './img_detail/img_detail.module';
import { ImgDetail } from './img_detail/entities/img_detail.entity';
import { BookingRoomModule } from './booking_room/booking_room.module';
import { BookingRoom } from './booking_room/entities/booking_room.entity';
import { RatetingModule } from './rateting/rateting.module';
import { Rateting } from './rateting/entities/rateting.entity';

@Module({
  imports: [
    UsersModule , TypeOrmModule.forRoot({
    type : 'mysql',
    host : 'localhost',
    port : 3306,
    username : 'root',
    password : '12345678',
    database : 'project_module5',
    entities : [Users , Hotels , Rooms , ImgDetail , BookingRoom , Rateting],
    synchronize : true, //
  }), HotelsModule, RoomsModule, ImgDetailModule, BookingRoomModule, RatetingModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
