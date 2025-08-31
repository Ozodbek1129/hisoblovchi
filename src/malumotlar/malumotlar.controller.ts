import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MalumotlarService } from './malumotlar.service';
import { CreateMalumotlarDto } from './dto/create-malumotlar.dto';
import { UpdateMalumotlarDto } from './dto/update-malumotlar.dto';

@Controller('malumotlar')
export class MalumotlarController {
  constructor(private readonly malumotlarService: MalumotlarService) {}

  @Post()
  create(@Body() createMalumotlarDto: CreateMalumotlarDto) {
    return this.malumotlarService.create(createMalumotlarDto);
  }

  @Get()
  findAll() {
    return this.malumotlarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.malumotlarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMalumotlarDto: UpdateMalumotlarDto) {
    return this.malumotlarService.update(+id, updateMalumotlarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.malumotlarService.remove(+id);
  }
}
