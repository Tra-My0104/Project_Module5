import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RatetingService } from './rateting.service';
import { RatetingController } from './rateting.controller';
import { Rateting } from './entities/rateting.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Rateting])],
  controllers: [RatetingController],
  providers: [RatetingService]
})
export class RatetingModule {}
