import { IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  imgRoom : string;

  @IsNotEmpty()
  nameRoom : string;

  @IsNotEmpty()
  price : number;

  @IsNotEmpty()
  location : string;

  @IsNotEmpty()
  imgRoom : string;
}
