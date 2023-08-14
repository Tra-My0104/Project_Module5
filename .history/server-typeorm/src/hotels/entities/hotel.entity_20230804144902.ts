import { ImgDetail } from 'src/img_detail/entities/img_detail.entity';
import { Rateting } from 'src/rateting/entities/rateting.entity';
import { Rooms } from 'src/rooms/entities/room.entity';
import { Entity, PrimaryGeneratedColumn, Column , OneToMany } from 'typeorm';

@Entity()
export class Hotels {
  @PrimaryGeneratedColumn()
  hotel_Id: number;

  @Column()
  imgRoom: string;

  @Column()
  nameRoom: string;

  @Column({type : 'float'})
  price: number;

  @Column()
  location: string;

  @Column()
  availability: string;

  @OneToMany(() => Rooms, (rooms) => rooms.hotels)
  rooms: Rooms[];

  @OneToMany(() => ImgDetail, (img_detail) => img_detail.hotels)
  img_detail: ImgDetail[]

  @OneToMany(() => Rateting , (rateting) => rateting.hotels)
  rateting : Rateting
}
