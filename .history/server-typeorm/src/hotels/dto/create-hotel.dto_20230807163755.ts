import { IsNotEmpty } from 'class-validator';

export class CreateHotelDto {

  @IsNotEmpty()
  nameRoom : string;

  @IsNotEmpty()
  price : number;

  @IsNotEmpty()
  location : string;

  @IsNotEmpty()
  availability : string;
}
