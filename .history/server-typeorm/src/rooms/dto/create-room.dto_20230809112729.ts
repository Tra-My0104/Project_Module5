import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty()
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
