import { Injectable, HttpException } from '@nestjs/common';
import { CompetitionFindException } from './competition-find.exception';
import { CompetitionGenericException } from './competition-generic.exception';
import { CompetitionCreateException } from './competition-create.exception';
import { competitionsConstants } from './competitions.constants';

@Injectable()
export class CompetitionsService {
  constructor() {
    // array responsável por emular a base de dados
    this.competitionsArray = new Array();
  }

  /**
   * Obtem todas as competições cadastradas
   * @returns Lista de Competition
   */
  findAll(filters) {

    try {

      let compResult = new Array();
      // único filtro aceito no momento: modalidade
      let sportType = filters != null ? filters.sportType : null;

      // aplicando filtros conforme solicitação do cliente
      if (sportType && sportType.length > 0) {
        compResult = this.competitionsArray.filter((comp) => {
          return comp.sportType === sportType
        });

        if (compResult.length == 0) {
          throw new CompetitionFindException("Não foi possível encontrar competições para a modalidade -> " + sportType);
        }
      } else {
        // sem filtros
        compResult = this.competitionsArray;
      }

      if (compResult.length > 0) {
        // ordenação pela data de início da competição
        return compResult.sort((comp1, comp2) => (comp1.dateTimeStarts > comp2.dateTimeStarts) ? 1 : ((comp2.dateTimeStarts > comp1.dateTimeStarts) ? -1 : 0));
      } else {
        throw new CompetitionFindException("Não existem competições cadastradas");
      }
    } catch (error) {
      if (error instanceof CompetitionFindException) {
        throw error;
      } else {
        throw new CompetitionGenericException('Ocorreu um erro inesperado ao consultar as competições: ' + error);
      }
    }
  }

  /**
   * Salva os dados de uma competição
   * @param {*} competition Objeto Competition
   */
  save(competition) {

    try {

      if (!competitionsConstants.SPORT_TYPES.includes(competition.sportType)) {
        throw new CompetitionCreateException('Modalidade informada é inválida -> ' + competition.sportType);
      }

      if (!competitionsConstants.STAGE_TYPES.includes(competition.stageType)) {
        throw new CompetitionCreateException('Etapa informada para o evento é inválida -> ' + competition.stageType);
      }

      let eventDateStarts = new Date(competition.dateTimeStarts);
      let eventDateFinish = new Date(competition.dateTimeFinish);
      let diffMinutes = null;

      /*
          O fluxo de cadastro deve permitir disputas entre atletas do mesmo país,
          apenas se a etapa for Final ou Semifinal. Para as demais etapas, não deve ser
          permitido.
      */
      if (competition.competitionStageType !== competitionsConstants.STAGE_TYPE_SEMIFINAL && competition.competitionStageType !== competitionsConstants.STAGE_TYPE_FINAL) {
        if (competition.nation1 === competition.nation2) {
          throw new CompetitionCreateException('O evento não permite disputa entre o mesmo país nesta etapa da competição');
        }
      }

      // A competição deve ter a duração de no mínimo 30 minutos.
      let diff = (eventDateStarts.getTime() - eventDateFinish.getTime()) / 1000;
      diff /= 60;
      diffMinutes = Math.abs(diff);

      if (diffMinutes < 30) {
        throw new CompetitionCreateException('O evento não pode possuir menos de 30 minutos de duração');
      }

      /*
          Duas competições não podem ocorrer no mesmo período, no mesmo local, para a
          mesma modalidade. Ex: Se eu tenho uma partida de futebol que com início às 18:00 e
          término às 20:00 no Estádio 1, eu não poderia ter outra partida de futebol se iniciando
          às 19:30 nesse mesmo estádio
      */
      let compDuplicated = this.competitionsArray.filter((comp) =>
        (comp.dateTimeStarts <= eventDateStarts && comp.dateTimeFinish >= eventDateFinish ||
          comp.dateTimeStarts < eventDateFinish && comp.dateTimeFinish > eventDateStarts) &&
        comp.sportType === competition.sportType && comp.eventPlace === competition.eventPlace
      )[0];

      if (compDuplicated != null) {
        throw new CompetitionCreateException('Já existe outro evento ocorrendo no mesmo período -> ' + JSON.stringify(compDuplicated));
      }

      // Para evitar problemas, a organização das olimpíadas que limitar a no máximo 4 competições por dia num mesmo local*/
      let countCompSameDay = this.competitionsArray.filter((comp) =>
        (comp.dateTimeStarts.getDate() === eventDateStarts.getDate() && comp.dateTimeStarts.getMonth() === eventDateStarts.getMonth() && comp.dateTimeStarts.getFullYear() === eventDateStarts.getFullYear()) &&
        comp.eventPlace === competition.eventPlace
      ).length;

      if (countCompSameDay >= competitionsConstants.LIMIT_COMP_COUNT_BY_PLACE) {
        throw new CompetitionCreateException('Limite de competições excedido para o mesmo dia e local');
      }

      competition.dateTimeStarts = eventDateStarts;
      competition.dateTimeFinish = eventDateFinish;

      // "persistência" de dados
      this.competitionsArray.push(competition);

    } catch (error) {
      if (error instanceof CompetitionCreateException) {
        throw error;
      } else {
        throw new CompetitionGenericException('Ocorreu um erro inesperado ao criar a competição: ' + error);
      }
    }
  }

}