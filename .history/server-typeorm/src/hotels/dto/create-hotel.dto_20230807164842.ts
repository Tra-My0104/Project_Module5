import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsNEmpty()
  imgRoom : string;

  @IsNotEmpty()
  nameRoom : string;

  @IsNotEmpty()
  price : number;

  @IsNotEmpty()
  location : string;

  @IsNotEmpty()
  availability : string;
}
