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

  async findRatetingsByHotelId(hotel_id: number , res) {
    try {
      const result = await this.ratetingRepo
        .createQueryBuilder('rateting')
        .select('rateting.*')
        .addSelect('users.username')
        .innerJoin('rateting.UserId', 'users')
        .where({ hotel_id })
        .orderBy('rateting.rateting_id', 'DESC') // Sắp xếp theo rateting_id mới nhất
        .getRawMany();
      res.status(200).json({
        message: "Lấy về thành công",
        data: result,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    
  }


  update(id: number, updateRatetingDto: UpdateRatetingDto) {
    return `This action updates a #${id} rateting`;
  }

  async remove(id: number, res) {
    try {
      const findRate = await this.ratetingRepo.findOne({ where: { rateting_id: id } });
      if (!findRate) {
        // Nếu không tìm thấy đánh giá, trả về lỗi 404 Not Found
        return res.status(404).json({ message: "Không tìm thấy đánh giá" });
      }
  
      await this.ratetingRepo.remove(findRate); 
      // Trả về thành công nếu xóa thành công
      return res.status(200).json({
        message: "Xóa đánh giá thành công",
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
}
