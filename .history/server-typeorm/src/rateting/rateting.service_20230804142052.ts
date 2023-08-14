import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Injectable } from '@nestjs/common';
import { CreateRatetingDto } from './dto/create-rateting.dto';
import { UpdateRatetingDto } from './dto/update-rateting.dto';
import { Rateting } from './entities/rateting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatetingService {
  constructor(@InjectRepository(Rateting) private ratetingRepo: Repository<Rateting> ) {}

  create(rateting , res) {
    try {
      const rate = this.ratetingRepo.create({
        comment : rateting.comment,
        star : rateting.star,
        hotel_Id : rateting.hotel
      })
    } catch (error) {
      
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
