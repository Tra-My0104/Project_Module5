import { Injectable } from '@nestjs/common';
import { CreateImgDetailDto } from './dto/create-img_detail.dto';
import { UpdateImgDetailDto } from './dto/update-img_detail.dto';

@Injectable()
export class ImgDetailService {
  create(createImgDetailDto: CreateImgDetailDto) {
    return 'This action adds a new imgDetail';
  }

  findAll() {
    return `This action returns all imgDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imgDetail`;
  }

  update(id: number, updateImgDetailDto: UpdateImgDetailDto) {
    return `This action updates a #${id} imgDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} imgDetail`;
  }
}
