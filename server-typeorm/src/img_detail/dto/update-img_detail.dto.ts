import { PartialType } from '@nestjs/mapped-types';
import { CreateImgDetailDto } from './create-img_detail.dto';

export class UpdateImgDetailDto extends PartialType(CreateImgDetailDto) {}
