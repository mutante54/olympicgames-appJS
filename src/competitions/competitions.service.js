import { Injectable } from '@nestjs/common';

@Injectable()
export class CompetitionsService {
  constructor() {
    // singleton responsável por emular uma base de dados
    this.competitionsArray = new Array();
  }

  /**
   * Obtem todas as competições cadastradas
   * @returns Lista de Competition
   */
  async findAll() {
    return await this.competitionsArray;
  }

  /**
   * Salva os dados de uma competição
   * @param {*} competition Objeto Competition
   */
  async save(competition) {
    await this.competitionsArray.push(competition);
  }

}