import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  async searchByName(name: string, res) {
    try {
      const hotels = await this.hotelsRepo
        .createQueryBuilder('hotels')
        .where('hotels.nameRoom LIKE :name', { name: `%${name}%` })
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
  Sau khi bạn có phần backend để thực hiện tìm kiếm theo tên khách sạn, bạn có thể gắn nó với thành phần tìm kiếm trên giao diện người dùng. Dưới đây là cách bạn có thể thực hiện điều đó:
  
  jsx
  Copy code
  import React, { useState } from 'react';
  import { Input, Button, Table } from 'antd';
  import 'antd/dist/antd.css';
  import axios from 'axios';
  
  const { Search } = Input;
  
  function AdminHotel() {
    const [searchResults, setSearchResults] = useState([]);
    
    const onSearch = async (value) => {
      try {
        const response = await axios.get(`http://localhost:4000/hotels/search?name=${value}`);
        setSearchResults(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const columns = [
      // Define your columns here
      // Example: { title: 'Tên Hotel', dataIndex: 'nameRoom', key: 'nameRoom' },
      // ...
    ];
  
    return (
      <>
        <div className="search">
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </div>
        <Table columns={columns} dataSource={searchResults} />
      </>
    );
  }
  
  export default AdminHotel;
  Trong ví dụ trên, sau khi nhấn nút tìm kiếm, dữ liệu khách sạn tìm thấy sẽ được hiển thị trong bảng. Bạn cần chỉnh sửa các cột (columns) để phù hợp với thông tin mà bạn muốn hiển thị trong bảng.
  
  
  
  
  User
  viết backend phần controler nữa
  ChatGPT
  Dưới đây là một phần controller cho việc tìm kiếm khách sạn theo tên trong phần backend của bạn:
  
  typescript
  Copy code
  import { Controller, Get, Query, Res, BadRequestException } from '@nestjs/common';
  import { HotelsService } from './hotels.service';
  
  @Controller('hotels')
  export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) {}
  
    // ... Các hàm controller khác
  
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
  
  
  
  
  
  
  
  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  async remove(id: number) {
    try {
      let findHotel = await this.hotelsRepo.findOne({where : {hotel_Id : id}})
      if(!findHotel) {
        throw new BadRequestException('Không tìm được khách sạn');
      }
      await this.hotelsRepo.remove(findHotel)
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
