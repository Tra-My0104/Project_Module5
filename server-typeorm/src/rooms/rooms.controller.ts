import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @Res() res:Response) {
    return this.roomsService.create(createRoomDto, res);
  }


  @Get()
  findAll( @Res() res:Response) {
    return this.roomsService.findAll(res);
  }

  @Get('/:id')
  findOneRooms(@Param('id') id: string, @Res() res:Response ) {
    return this.roomsService.findOneRooms(+id , res);
  }

  @Get('/detailroom/:id')
  getRoomDetailById(@Param('id') id: string, @Res() res:Response) {
    return this.roomsService.getRoomDetailById(+id , res);
  }

  @Get('searchByHotel')
  findByHotelId(@Query('name') hotelName: string, @Res() res: Response) {
   return this.roomsService.findByHotelId(hotelName,res)
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto, @Res() res:Response) {
    return this.roomsService.update(+id, updateRoomDto , res);
  }

  @Patch('/status_room/:id')
  updateStatus(@Param('id') id: string, @Res() res:Response) {
    return this.roomsService.updateStatus(+id , res);
  }
  @Patch('/status_room_1/:id')
  updateStatus_1(@Param('id') id: string, @Res() res:Response) {
    return this.roomsService.updateStatus_1(+id , res);
  }
  @Patch('/status_room_2/:id')
  updateStatus_2(@Param('id') id: string, @Res() res:Response) {
    return this.roomsService.updateStatus_2(+id , res);
  }
  @Patch('/status_room_3/:id')
  updateStatus_3(@Param('id') id: string, @Res() res:Response) {
    return this.roomsService.updateStatus_3(+id , res);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Res() res:Response) {
    return this.roomsService.remove(+id , res);
  }
}
