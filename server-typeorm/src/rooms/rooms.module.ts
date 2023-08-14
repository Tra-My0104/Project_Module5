import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Rooms } from './entities/room.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Rooms])],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
