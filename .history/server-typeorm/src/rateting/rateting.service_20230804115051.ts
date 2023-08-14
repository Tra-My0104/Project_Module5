import { Injectable } from '@nestjs/common';
import { CreateRatetingDto } from './dto/create-rateting.dto';
import { UpdateRatetingDto } from './dto/update-rateting.dto';

@Injectable()
export class RatetingService {
  constructor(@InjectRepository(Rooms) private roomsRepo: Repository<Rooms> ) {}
  create(createRatetingDto: CreateRatetingDto) {
    return 'This action adds a new rateting';
  }

  findAll() {
    return `This action returns all rateting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rateting`;
  }

  update(id: number, updateRatetingDto: UpdateRatetingDto) {
    return `This action updates a #${id} rateting`;
  }

  remove(id: number) {
    return `This action removes a #${id} rateting`;
  }
}
