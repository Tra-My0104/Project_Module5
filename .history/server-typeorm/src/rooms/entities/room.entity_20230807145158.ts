import { BookingRoom } from 'src/booking_room/entities/booking_room.entity';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { Entity, PrimaryGeneratedColumn, Column , ManyToOne , JoinColumn , ManyToMany, JoinTable} from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  rooms_id: number;

  @Column({type : 'longtext'})
  direction: string;

  @Column()
  capacity: string;

  @Column()
  description: string;

  @Column()
  floor_area: string;

  @Column()
  amenities: string;

  @Column()
  name_room: string;

  @Column({type : 'float'})
  price_room: string;

  @Column({type : 'tinyint'})
  status_room: number;

  @Column({type : 'longtext'})
  img_rooms: number;

  @ManyToOne(() => Hotels, (hotel) => hotel.rooms)
  @JoinColumn({ name: "hotel_id" })
  hotels: Hotels;

   @ManyToMany(() => BookingRoom)
  @JoinTable({
    name: "booking_room_rooms", // Tên bảng trung gian
    joinColumn: { name: "rooms_id", referencedColumnName: "rooms_id" }, // Tên cột khóa ngoại tại bảng trung gian trỏ tới Rooms
    inverseJoinColumn: { name: "booking_room_id", referencedColumnName: "booking_room_id" }, // Tên cột khóa ngoại tại bảng trung gian trỏ tới BookingRoom
  })
  booking_rooms: BookingRoom[];
}
