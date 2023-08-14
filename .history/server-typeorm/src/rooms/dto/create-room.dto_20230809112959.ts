import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty()
  direction : string;

  @IsNotEmpty()
  capacity : string;

  @IsNotEmpty()
  price : number;

  @IsNotEmpty()
  description : string;

  @IsNotEmpty()
  availability : string;
}
