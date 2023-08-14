import { BookingRoom } from 'src/booking_room/entities/booking_room.entity';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { Entity, PrimaryGeneratedColumn, Column , ManyToOne , JoinColumn , OneToOne} from 'typeorm';

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
  amenities: number;

  @Column({type : 'float'})
  price_room: string;

  @Column({type : 'tinyint'})
  status_room: number;

  @Column({type : 'longtext'})
  img_rooms: number;

  @ManyToOne(() => Hotels, (hotel) => hotel.rooms)
  @JoinColumn({ name: "hotel_id" })
   hotels : Hotels

   @OneToOne(() => BookingRoom, (booking_room) => booking_room.booking_room_id)
   @JoinColumn({ name: "booking_room_id" })
   booking_rooms : BookingRoom
}
