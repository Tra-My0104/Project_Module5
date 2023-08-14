import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';


@Module({
  imports : [TypeOrmModule.forFeature([Users]) ,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
