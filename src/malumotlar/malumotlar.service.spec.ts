import { Test, TestingModule } from '@nestjs/testing';
import { MalumotlarService } from './malumotlar.service';

describe('MalumotlarService', () => {
  let service: MalumotlarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MalumotlarService],
    }).compile();

    service = module.get<MalumotlarService>(MalumotlarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
