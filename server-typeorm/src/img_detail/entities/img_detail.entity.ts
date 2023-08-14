import { Hotels } from 'src/hotels/entities/hotel.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class ImgDetail {
  @PrimaryGeneratedColumn()
  img_detail_id: number;

  @Column({type : 'longtext'})
  images: string;

  @ManyToOne(() => Hotels, (hotels) => hotels.img_detail)
  @JoinColumn({ name: "hotel_id" })
  hotels: Hotels[]
}
