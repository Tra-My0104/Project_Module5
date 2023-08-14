import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotels } from './entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
 constructor(@InjectRepository(Hotels) private hotelsRepo: Repository<Hotels>){}

   async create(createHotelDto: CreateHotelDto) {
    try {
      const newHotel = await this.hotelsRepo.create({
        imgRoom : createHotelDto.imgRoom,
        nameRoom : createHotelDto.nameRoom,
        price : createHotelDto.price,
        location : createHotelDto.location,
        availability : createHotelDto.availability
      })
      await this.hotelsRepo.save(newHotel)
      
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error);
    }
  }

  async findAll(res) {
    try {
      let hotels = await this.hotelsRepo.find();
      return res.status(200).json({ 
      message : "Lấy thành công",
      data : [hotels]
    })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findLocation(location: string , res) {
    try {
      let findHotel = await this.hotelsRepo.find({where : {location : location}})
      if(!findHotel){
        throw new BadRequestException('Không có khách sạn thuộc khu vực này');
      }
      return res.status(200).json({
        message : "Lấy thành công khách sạn",
        findHotel
      })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async search(location: string, search: string, res) {
    try {
      const hotels = await this.hotelsRepo
        .createQueryBuilder('hotels')
        .where('hotels.location = :location', { location })
        .andWhere('hotels.nameRoom LIKE :search', { search: `%${search}%` })
        .getMany();
  
      if (hotels.length === 0) {
        throw new BadRequestException('No hotels found matching the search criteria');
      }
      return res.status(200).json({
        message: 'Search successful',
        data: hotels,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
  
  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
