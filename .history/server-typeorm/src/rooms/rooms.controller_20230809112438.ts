import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post(':hotelId')
  create(@Body() createRoomDto: CreateRoomDto, @Param('hotelId') hotelId: number , @Res() res:Response) {
    return this.roomsService.create(createRoomDto, hotelId);
  }


  @Get()
  findAll( @Res() res:Response) {
    return this.roomsService.findAll(res);
  }

  @Get('/detailroom/:id')
  getRoomDetailById(@Param('id') id: string, @Res() res:Response) {
    return this.roomsService.getRoomDetailById(+id , res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto, @Res() res:Response) {
    return this.roomsService.update(+id, updateRoomDto , res);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res:Response) {
    return this.roomsService.remove(+id , res);
  }
}
