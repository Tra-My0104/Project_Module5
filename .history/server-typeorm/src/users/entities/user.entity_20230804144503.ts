import { BookingRoom } from 'src/booking_room/entities/booking_room.entity';
import { Rateting } from 'src/rateting/entities/rateting.entity';
import { Entity, PrimaryGeneratedColumn, Column , OneToMany} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column()
  Email: string;

  @Column()
  Phone: string;

  @Column()
  UserName: string;

  @Column()
  DateOfBirth: string;

  @Column({type : 'tinyint'})
  Gender: number;

  @Column()
  Password: string;

  @Column({type : 'tinyint'})
  Role: number;

  @Column({type : 'tinyint'})
  Status: number;

  @OneToMany(() => BookingRoom , (booking_rooms) => booking_rooms.users)
  booking_room : BookingRoom

  @OneToMany(() => Rateting , (rateting) => rateting.user_id)
  rateting : Rateting
}
