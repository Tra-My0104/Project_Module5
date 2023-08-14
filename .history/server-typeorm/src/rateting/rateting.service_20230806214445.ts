import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Injectable, BadRequestException ,NotFoundException} from '@nestjs/common';
import { UpdateRatetingDto } from './dto/update-rateting.dto';
import { Rateting } from './entities/rateting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatetingService {
  constructor(@InjectRepository(Rateting) private ratetingRepo: Repository<Rateting> ) {}

  async create(newRate: any, res): Promise<any> {
    try {
      const rate = this.ratetingRepo.create({
        comment: newRate.comment,
        star: newRate.star,
        hotel_id : newRate.hotel_id,
        UserId : newRate.UserId
      });
      await this.ratetingRepo.save(rate);
      return res.status(201).json({
        message: 'Đánh giá thành công',
        data: rate,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  findAll() {
    try {
      return this.ratetingRepo.find();
    } catch (error) {
      console.log(error)
    }
  }

  async findRatetingsByHotelId(hotel_id: number) {
    console.log(hotel_id)
    const parsedHotelId = Number(hotel_id);
    if (isNaN(parsedHotelId)) {
      throw new NotFoundException('HotelId không hợp lệ');
    }
    try {
      const result = await this.ratetingRepo
      .createQueryBuilder('rateting')
      .select('rateting.*')
      .addSelect('users.username')
      .innerJoin('rateting.UserId', 'users')
      .where({ hotel_id }) 
      .getRawMany();
    console.log(result);
    } catch (error) {
      console.log(error)
    }
  }


  update(id: number, updateRatetingDto: UpdateRatetingDto) {
    return `This action updates a #${id} rateting`;
  }

  async remove(id: number) {
    try {
      const findRate = await this.ratetingRepo.
    } catch (error) {
      
    }
    return 
  }
}
