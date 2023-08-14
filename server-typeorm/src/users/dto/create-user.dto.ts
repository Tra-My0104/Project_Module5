import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  Phone: string;

  @IsNotEmpty()
  UserName: string;

  @IsNotEmpty()
  DateOfBirth: string;

  @IsNotEmpty()
  Gender: number;

  @IsNotEmpty()
  Password: string;

  @IsNotEmpty()
  Role : number;

  @IsNotEmpty()
  Status : number
}

export class LoginUserDto {
  @IsNotEmpty()
  Password: string;

  @IsNotEmpty()
  @IsEmail()
  Email: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  Password: string;

  @IsNotEmpty()
  @MinLength(5)
  newPassword: string;
}