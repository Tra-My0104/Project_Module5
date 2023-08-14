import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotels } from './entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
 constructor(@InjectRepository(Hotels) private hotelsRepo: Repository<Hotels>){}

   async create(createHotelDto: any , res) {
    try {
      const newHotel = await this.hotelsRepo.create({
        imgRoom : createHotelDto.imgRoom,
        nameRoom : createHotelDto.nameRoom,
        price : createHotelDto.price,
        location : createHotelDto.location,
        availability : createHotelDto.availability
      })
      await this.hotelsRepo.save(newHotel)
      res.status(200).json({
        messager : "Thêm Hotel thành công",
        data : newHotel
      })
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
      hotels
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
        throw new NotFoundException('Không có khách sạn thuộc khu vực này');
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
      // Nếu như có từ khóa tìm kiếm 
      if(!location) {
        const hotels = await this.hotelsRepo
        .createQueryBuilder('hotels')
        .where('hotels.nameRoom LIKE :name', { name: `%${search}%` })
        .getMany();
  
      if (hotels.length === 0) {
        throw new NotFoundException('Không tim thấy khách sạn');
      }
      return res.status(200).json({
        message: 'Search successful',
        data: hotels,
      });
      } 
      else {
      const hotels = await this.hotelsRepo
        .createQueryBuilder('hotels')
        .where('hotels.location = :location', { location })
        .andWhere('hotels.nameRoom LIKE :search', { search: `%${search}%` })
        .getMany();
  
      if (hotels.length === 0) {
        throw new NotFoundException('No hotels found matching the search criteria');
      }
      return res.status(200).json({
        message: 'Search successful',
        data: hotels,
      });
    }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  
  
  async update(id: number, updateHotelDto: UpdateHotelDto) {
    try {
      const findHotel = await this.hotelsRepo.findOne({where : {hotel_Id : id}})
      if(!findHotel) {
        throw new NotFoundException('Không tìm được khách sạn');
      }
      findHotel.nameRoom = updateHotelDto.nameRoom;
      findHotel.imgRoom = updateHotelDto.imgRoom;
      findHotel.location = updateHotelDto.location;
      findHotel.price = updateHotelDto.price;
      findHotel.availability = updateHotelDto.availability
      await this.hotelsRepo.save(findHotel)
      res
    } catch (error) {
      
    }
  }

  async remove(id: number) {
    try {
      let findHotel = await this.hotelsRepo.findOne({where : {hotel_Id : id}})
      if(!findHotel) {
        throw new NotFoundException('Không tìm được khách sạn');
      }
      await this.hotelsRepo.remove(findHotel)
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
