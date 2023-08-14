import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RatetingService } from './rateting.service';
import { CreateRatetingDto } from './dto/create-rateting.dto';
import { UpdateRatetingDto } from './dto/update-rateting.dto';

@Controller('rateting')
export class RatetingController {
  constructor(private readonly ratetingService: RatetingService) {}

  @Post()
  create(@Body() newRate: any , @Res() res:Response) {
    return this.ratetingService.create(newRate,res);
  }

  @Get()
  findAll() {
    return this.ratetingService.findAll();
  }

  @Get('/:hotelId')
  async findRatetingsByHotelId(@Param('id') id: number) {
    return this.ratetingService.findRatetingsByHotelId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatetingDto: UpdateRatetingDto) {
    return this.ratetingService.update(+id, updateRatetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratetingService.remove(+id);
  }
}
