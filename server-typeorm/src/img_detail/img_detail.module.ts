import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ImgDetailService } from './img_detail.service';
import { ImgDetailController } from './img_detail.controller';
import { ImgDetail } from './entities/img_detail.entity';

@Module({
  imports : [TypeOrmModule.forFeature([ImgDetail])],
  controllers: [ImgDetailController],
  providers: [ImgDetailService]
})
export class ImgDetailModule {}
