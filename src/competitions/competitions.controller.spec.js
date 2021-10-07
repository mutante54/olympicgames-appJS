import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';

/**
 * Teste unitário para o controller de competições
 */

describe('CompetitionsController', () => {

  let compController;
  let compService;

  beforeEach(() => {
    compService = new CompetitionsService();
    compController = new CompetitionsController(compService);
  });

  it('should return an array of comps', async () => {
    const result = ['test'];
    jest.spyOn(compService, 'findAll').mockImplementation(() => result);

    expect(await compController.findAll()).toBe(result);
  });
});
