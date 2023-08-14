import { Users } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column , ManyToOne , JoinColumn, ManyToMany } from 'typeorm';

@Entity()
export class BookingRoom {
  @PrimaryGeneratedColumn()
  booking_room_id: number;

  @Column()
  check_in_date : string;

  @Column()
  number_night : string;

  @Column({type : "float"})
  total_price : number;

  @Column()
  check_out_date : string

  @ManyToOne(() => Users, (users) => users.booking_room)
  @JoinColumn({ name: "UserId" })
   users : Users

   @ManyToMany(() => Rooms, (rooms) => rooms.booking_rooms)
   rooms: Rooms[];
}
