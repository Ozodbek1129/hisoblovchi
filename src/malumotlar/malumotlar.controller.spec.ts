import { Test, TestingModule } from '@nestjs/testing';
import { MalumotlarController } from './malumotlar.controller';
import { MalumotlarService } from './malumotlar.service';

describe('MalumotlarController', () => {
  let controller: MalumotlarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MalumotlarController],
      providers: [MalumotlarService],
    }).compile();

    controller = module.get<MalumotlarController>(MalumotlarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
