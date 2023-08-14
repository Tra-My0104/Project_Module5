import { Hotels } from 'src/hotels/entities/hotel.entity';
import { Users } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Rateting {
  @PrimaryGeneratedColumn()
  rateting_id: number;

  @Column({type : 'varchar', default: ""})
  comment: string;

  @Column({type: 'int', default: 0})
  star : number;

  @ManyToOne(() => Users , (users) => users.rateting)
  @JoinColumn({ name: "UserId" })
  UserId : Users

  @ManyToOne(() => Hotels , (hotel) => hotel.rateting)
  @JoinColumn({ name: "hotel_id" })
  hotel_id : Hotels
}

