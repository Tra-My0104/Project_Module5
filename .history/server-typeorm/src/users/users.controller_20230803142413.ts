import { Response } from 'express';
import { Controller, Get, Post, Body, Patch, Param, Res, Put , UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto, LoginUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto , @Res() res: Response) {
    return this.usersService.register(registerUserDto, res);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    return this.usersService.login(loginUserDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.usersService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string , @Res() res: Response) {
    return this.usersService.findOne(+id , res);
  }

  @UseGuards(UsersG)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('/update_password/:id')
  updatePassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.updatePassword(+id, changePasswordDto);
  }

  @Put('/edit_user/:id')
  editUser(@Param('id') id: string, @Body() editUser : any, @Res() res: Response){
    return this.usersService.editUser(+id , editUser , res)
  }
}
