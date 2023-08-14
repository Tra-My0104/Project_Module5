import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImgDetailService } from './img_detail.service';
import { CreateImgDetailDto } from './dto/create-img_detail.dto';
import { UpdateImgDetailDto } from './dto/update-img_detail.dto';

@Controller('img-detail')
export class ImgDetailController {
  constructor(private readonly imgDetailService: ImgDetailService) {}

  @Post()
  create(@Body() createImgDetailDto: CreateImgDetailDto) {
    return this.imgDetailService.create(createImgDetailDto);
  }

  @Get()
  findAll() {
    return this.imgDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImgDetailDto: UpdateImgDetailDto) {
    return this.imgDetailService.update(+id, updateImgDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgDetailService.remove(+id);
  }
}
