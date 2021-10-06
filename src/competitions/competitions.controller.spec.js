import { Test } from '@nestjs/testing';
import { CompetitionsController } from './competitions.controller';

describe('Users Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CompetitionsController],
    }).compile();

    controller = module.get(CompetitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
