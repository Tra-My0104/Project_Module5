import { Controller, Get, Post, Body, Patch, Param, Delete, Res , Query} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';


@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto, @Res() res : Response) {
    return this.hotelsService.create(createHotelDto , res);
  }

  @Get()
  findAll(@Res() res : Response) {
    return this.hotelsService.findAll(res);
  }

  @Get('/location')
  findLocation(@Query('location') location : string , @Res() res : Response) {
    return this.hotelsService.findLocation(location,res);
  }

  @Get('/:location/search')
  search(@Param('location') location : string , @Query('search') search : string , @Res() res : Response) {
    return this.hotelsService.search(location,search,res);
  }

  @Get('search')
  async searchByName(
    @Query('name') name: string,
    @Res() res,
  ) {
    try {
      const hotels = await this.hotelsService.searchByName(name);
      return res.status(200).json({
        message: 'Search successful',
        data: hotels,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
Chú ý rằng HotelsService là một dịch vụ (service) của bạn, và tôi giả sử bạn đã cài đặt và sử dụng nó cho các chức năng CRUD của khách sạn.

Phần @Get('search') sẽ tạo một endpoint cho việc tìm kiếm theo tên khách sạn. Tham số @Query('name') sẽ lấy giá trị của tham số truy vấn name từ URL.

Sau khi bạn đã tạo controller như trên, bạn có thể gọi API tìm kiếm từ phía frontend bằng cách sử dụng thư viện axios hoặc cách thức gửi yêu cầu HTTP khác.







  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }
}
