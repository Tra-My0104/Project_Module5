import { Hotels } from 'src/hotels/entities/hotel.entity';
import { Users } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Rateting {
  @PrimaryGeneratedColumn()
  rateting_id: number;

  @Column({type : 'longtext', default: ''})
  comment: string;

  @Column()
  star : number;

  @ManyToOne(() => Users , (users) => users.rateting)
  @JoinColumn({ name: "UserId" })
  users_id : Users

  @ManyToOne(() => Hotels , (hotel) => hotel.rateting)
  @JoinColumn({ name: "hotel_id" })
  hotel_id : Hotels
}

