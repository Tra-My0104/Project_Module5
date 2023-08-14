import { BookingRoom } from 'src/booking_room/entities/booking_room.entity';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { Entity, PrimaryGeneratedColumn, Column , ManyToOne , JoinColumn , ManyToMany, JoinTable, OneToMany} from 'typeorm';

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
  price_room: number;

  @Column({type : 'tinyint'})
  status_room: number;

  @Column({type : 'longtext'})
  img_rooms: string;

  @ManyToOne(() => Hotels, (hotel) => hotel.rooms)
  @JoinColumn({ name: "hotel_id" })
  hotels: Hotels;

  @OneToMany(() => BookingRoom, (bookingRoom) => bookingRoom.rooms)
  booking_rooms: BookingRoom; 
}
