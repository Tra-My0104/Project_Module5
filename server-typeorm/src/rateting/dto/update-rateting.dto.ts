import { PartialType } from '@nestjs/mapped-types';
import { CreateRatetingDto } from './create-rateting.dto';

export class UpdateRatetingDto extends PartialType(CreateRatetingDto) {}
