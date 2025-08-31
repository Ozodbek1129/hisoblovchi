import { PartialType } from '@nestjs/mapped-types';
import { CreateMalumotlarDto } from './create-malumotlar.dto';

export class UpdateMalumotlarDto extends PartialType(CreateMalumotlarDto) {}
