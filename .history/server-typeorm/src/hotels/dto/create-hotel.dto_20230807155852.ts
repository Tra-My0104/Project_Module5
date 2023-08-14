import { IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  imgRoom : string;

  @IsNotEmpty()
  nameRoom : string;

  @IsNotEmpty()
  price : num;

  @IsNotEmpty()
  imgRoom : string;

  @IsNotEmpty()
  imgRoom : string;
}
