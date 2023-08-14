import { Rooms } from 'src/rooms/entities/room.entity';
import { Users } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class BookingRoom {
  @PrimaryGeneratedColumn()
  booking_room_id: number;

  @Column({default : true})
  check_in_date: string;

  @Column({default : true})
  number_night: string;

  @Column({ type: 'float' , default : true })
  total_price: number;

  @Column({default : true})
  check_out_date: string;

  @Column()
  rooms_id : number;

  @Column()
  UserId : number;

  @ManyToOne(() => Users, (users) => users.booking_room)
  @JoinColumn({ name: 'UserId' })
  users: Users;

  @ManyToOne(() => Rooms, (rooms) => rooms.booking_rooms)
  @JoinColumn({ name: 'rooms_id' })
  rooms: Rooms[];
}
