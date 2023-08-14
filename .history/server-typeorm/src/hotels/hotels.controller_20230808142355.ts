import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto, @Res() res: Response) {
    return this.hotelsService.create(createHotelDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.hotelsService.findAll(res);
  }

  @Get('/location')
  findLocation(@Query('location') location: string, @Res() res: Response) {
    return this.hotelsService.findLocation(location, res);
  }

  @Get('/location/search')
  search(
    @Query('search') search: string,
    @Query('location') location: string,
    @Res() res: Response,
  ) {
    return this.hotelsService.search(location, search, res);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto, @Res() res: Response) {
    return this.hotelsService.update(+id, updateHotelDto , res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }
}
