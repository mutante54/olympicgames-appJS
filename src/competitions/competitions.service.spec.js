import { CompetitionsService } from './competitions.service';

/**
 * Teste unitário para o service de competições
 */

describe('CompetitionsService', () => {

  let compService;

  beforeEach(() => {
    compService = new CompetitionsService();
  });

  // teste seria diferente com uma base persistente de dados, pois poderíamos ter dados iniciais
  it('Return error', () => {
    try {
      compService.findAll();
    } catch (error) {
      expect(error.message).toBe("Não existem competições cadastradas");
    }
  });

  it('Return Null (ok)', () => {
    expect(compService.save({
      sportType: 'SOCCER',
      eventPlace: 'Arena 200',
      dateTimeStarts: 'Wed, 07 Oct 2021 02:00:00 GMT-0300',
      dateTimeFinish: 'Wed, 07 Oct 2021 04:10:00 GMT-0300',
      nation1: 'Brazil',
      nation2: 'Russia',
      stageType: 'GROUP_STAGE'
    })).toBe(undefined);
  });

});
