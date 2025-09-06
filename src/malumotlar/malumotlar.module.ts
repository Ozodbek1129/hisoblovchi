import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MalumotlarService } from './malumotlar.service';
import { Malumot } from './entities/malumotlar.model';
import { MalumotlarController } from './malumotlar.controller';

@Module({
  imports: [SequelizeModule.forFeature([Malumot])],
  providers: [MalumotlarService],
  exports: [MalumotlarService],
  controllers: [MalumotlarController],
})
export class MalumotlarModule {}
