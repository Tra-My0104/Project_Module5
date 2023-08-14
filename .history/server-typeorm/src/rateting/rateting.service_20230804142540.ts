import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRatetingDto } from './dto/create-rateting.dto';
import { UpdateRatetingDto } from './dto/update-rateting.dto';
import { Rateting } from './entities/rateting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatetingService {
  constructor(@InjectRepository(Rateting) private ratetingRepo: Repository<Rateting> ) {}

  
  async create(newRate: any, res): Promise<any> {
    try {
      const rate = this.ratetingRepository.create({
        comment: newRate.comment,
        star: newRate.star,
        users: newRate.userId, // Thêm users vào relation
        hotel: newRate.hotelId, // Thêm hotel vào relation
      });

      await this.ratetingRepository.save(rate);

      return res.status(201).json({
        message: 'Đánh giá thành công',
        data: rate,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

  findAll() {
    try {
      return this.ratetingRepo.find();
    } catch (error) {
      console.log(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} rateting`;
  }

  update(id: number, updateRatetingDto: UpdateRatetingDto) {
    return `This action updates a #${id} rateting`;
  }

  remove(id: number) {
    return `This action removes a #${id} rateting`;
  }
}
