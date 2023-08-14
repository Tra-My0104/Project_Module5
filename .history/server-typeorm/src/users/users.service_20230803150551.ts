import { Response } from 'express';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ChangePasswordDto, LoginUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users> , private jwtService: JwtService) {}

  async register(registerUserDto: RegisterUserDto , res : Response) {
    try {
      let findEmail = await this.usersRepo.findOne({where : {Email : registerUserDto.Email}})
      let findPhone = await this.usersRepo.findOne({where : {Phone : registerUserDto.Phone}})
      if(findEmail){
        throw new BadRequestException("Email đã tồn tại");
      }else if(findPhone){
        throw new BadRequestException("Phone đã tồn tại");
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        registerUserDto.Password,
        saltRounds,
      );
      const newUsers = await this.usersRepo.create({
        Email : registerUserDto.Email,
        Phone : registerUserDto.Phone,
        UserName : registerUserDto.UserName,
        DateOfBirth : registerUserDto.DateOfBirth,
        Gender : registerUserDto.Gender,
        Password : hashedPassword,
        Role : 0,
        Status : 0
      })
      await this.usersRepo.save(newUsers)
      return res.status(200).json({
        message : "Thêm mới user thành công",
        data : newUsers
      })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async login(loginUserDto: LoginUserDto , res : Response){
    try {
      let user = await this.usersRepo.findOne({where : {Email : loginUserDto.Email}})
      if(!user){
        throw new BadRequestException("Email đăng nhập không đúng");
      }

      const isPasswordMatch = await bcrypt.compare(loginUserDto.Password, user.Password);

      if (!isPasswordMatch) {
        throw new BadRequestException('Mật khẩu không đúng');
      }

      const payload = { id: user.UserId, email: user.Email };
      const access_token = await this.jwtService.sign(payload);

      return res.status(200).json({
        message: 'Đăng nhập thành công',
        status: 200,
        data: user,
        access_token
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(res : Response) {
    try {
      let users = await this.usersRepo.find();
      return res.status(200).json({ 
      message : "Lấy thành công",
      data : [users]
    })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number, res : Response) {
    try {
      let findUser = await this.usersRepo.findOne({where : {UserId : id}})
      return  res.status(200).json({ 
        message : "Lấy thành công",
        data : findUser
      })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
     let findUser = await this.usersRepo.findOne({where : {UserId : id}})
     if(!findUser){
      return 'Không tìm thấy user'
     }
      findUser.UserName = updateUserDto.UserName;
      findUser.Gender = updateUserDto.Gender;
      findUser.Password = updateUserDto.Password;
      findUser.DateOfBirth = updateUserDto.DateOfBirth;
      return this.usersRepo.save(findUser)
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async updatePassword(id: number,  changePasswordDto: ChangePasswordDto) {
    try {
     let findUser = await this.usersRepo.findOne({where : {UserId : id}})
     if(!findUser){
      return 'Không tìm thấy user'
     }
     const isPasswordMatch = await bcrypt.compare(
      changePasswordDto.Password,
      findUser.Password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('Mật khẩu hiện tại không đúng');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      saltRounds,
    );

    findUser.Password = hashedPassword;
    await this.usersRepo.save(findUser);

    return {
      message: 'Đổi mật khẩu thành công',
      status: 200,
    };
  } catch (error) {
    console.log(error);
    throw new BadRequestException('Lỗi khi đổi mật khẩu');
  }

}

  async editUser(id : number , editUser : any , res : Response){
    try {
      let findUser = await this.usersRepo.findOne({where : {UserId : id}})
     if(!findUser){
      return 'Không tìm thấy user'
     }
     findUser.UserName = editUser.UserName;
     findUser.Phone = editUser.Phone;
     findUser.Email = editUser.Email;
     findUser.Role = editUser.Role;
     findUser.Status = editUser.Status;
     let result_edit_user = await this.usersRepo.save(findUser)
     return res.status(200).json({
      message:'Edit user thành công',
      data : result_edit_user
     })
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
  
}
