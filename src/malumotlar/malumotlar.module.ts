import { Module } from '@nestjs/common';
import { MalumotlarService } from './malumotlar.service';
import { MalumotlarController } from './malumotlar.controller';

@Module({
  controllers: [MalumotlarController],
  providers: [MalumotlarService],
})
export class MalumotlarModule {}
