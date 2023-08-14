import { IsNotEmpty } from "class-validator";

export class CreateRoomDto {
  @IsNotEmpty()
  direction : string;

  @IsNotEmpty()
  capacity : string;

  @IsNotEmpty()
  price_room : number;

  @IsNotEmpty()
  description : string;

  @IsNotEmpty()
  floor_area : string;

  @IsNotEmpty()
  img_rooms : string;

  @IsNotEmpty()
  amenities : string;

  @IsNotEmpty()
  name_room : string;
  
  @IsNotEmpty()
  name_room : string;
}
