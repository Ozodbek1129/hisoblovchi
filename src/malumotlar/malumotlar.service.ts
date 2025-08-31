import { Injectable } from '@nestjs/common';
import { CreateMalumotlarDto } from './dto/create-malumotlar.dto';
import { UpdateMalumotlarDto } from './dto/update-malumotlar.dto';

@Injectable()
export class MalumotlarService {
  create(createMalumotlarDto: CreateMalumotlarDto) {
    return 'This action adds a new malumotlar';
  }

  findAll() {
    return `This action returns all malumotlar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} malumotlar`;
  }

  update(id: number, updateMalumotlarDto: UpdateMalumotlarDto) {
    return `This action updates a #${id} malumotlar`;
  }

  remove(id: number) {
    return `This action removes a #${id} malumotlar`;
  }
}
