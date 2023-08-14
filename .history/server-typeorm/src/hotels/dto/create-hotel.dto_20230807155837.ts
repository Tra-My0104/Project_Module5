import { IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  imgRoom : string;

  @IsNotEmpty()
  nameRoom : string;

  @IsNotEmpty()
  imgRoom : string;

  @IsNotEmpty()
  imgRoom : string;

  @IsNotEmpty()
  imgRoom : string;
}
