import { Injectable, HttpException } from '@nestjs/common';
import { classPrivateMethod } from '../../../../../Users/jeffe/AppData/Local/Microsoft/TypeScript/4.4/node_modules/@babel/types/lib/index';
import { Competition } from './competition';
import { CompetitionException } from './competition.exception';
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
  findAll() {
    return this.competitionsArray;
  }

  /**
   * Salva os dados de uma competição
   * @param {*} competition Objeto Competition
   */
  save(competition) {

    try {

      if (!competitionsConstants.SPORT_TYPES.includes(competition.sportType)) {
        throw new CompetitionException('Modalidade informada é inválida -> ' + competition.sportType);
      }

      if (!competitionsConstants.STAGE_TYPES.includes(competition.stageType)) {
        throw new CompetitionException('Etapa informada para o evento é inválida -> ' + competition.stageType);
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
          throw new CompetitionException('O evento não permite disputa entre o mesmo país nesta etapa da competição');
        }
      }

      // A competição deve ter a duração de no mínimo 30 minutos.
      let diff = (eventDateStarts.getTime() - eventDateFinish.getTime()) / 1000;
      diff /= 60;
      diffMinutes = Math.abs(diff);

      if (diffMinutes < 30) {
        throw new CompetitionException('O evento não pode possuir menos de 30 minutos de duração');
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
        throw new CompetitionException('Já existe outro evento ocorrendo no mesmo período -> ' + JSON.stringify(compDuplicated));
      }

      // Para evitar problemas, a organização das olimpíadas que limitar a no máximo 4 competições por dia num mesmo local*/
      let countCompSameDay = this.competitionsArray.filter((comp) =>
        (comp.dateTimeStarts.getDate() === eventDateStarts.getDate() && comp.dateTimeStarts.getMonth() === eventDateStarts.getMonth() && comp.dateTimeStarts.getFullYear() === eventDateStarts.getFullYear()) &&
        comp.eventPlace === competition.eventPlace
      ).length;

      if (countCompSameDay >= competitionsConstants.LIMIT_COMP_COUNT_BY_PLACE) {
        throw new CompetitionException('Limite de competições excedido para o mesmo dia e local');
      }

      competition.dateTimeStarts = eventDateStarts;
      competition.dateTimeFinish = eventDateFinish;

      // "persistência" de dados
      this.competitionsArray.push(competition);

    } catch (error) {
      if (error instanceof CompetitionException) {
        throw error;
      } else {
        throw new CompetitionException('Ocorreu um erro inesperado ao realizar a requisição: ' + error);
      }
    }
  }



}