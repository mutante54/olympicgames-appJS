import { Test } from '@nestjs/testing';
import { CompetitionsService } from './competitions.service';

describe('CompetitionsService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CompetitionsService],
    }).compile();

    service = module.get(CompetitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
