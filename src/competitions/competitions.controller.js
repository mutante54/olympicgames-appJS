import { Controller, Dependencies, Post, Body, Get, Bind, UseFilters, Query } from '@nestjs/common';
import { HttpExceptionFilter } from '../http-exception.filter';
import { CompetitionsService } from './competitions.service';

@Controller('competitions')
@Dependencies(CompetitionsService)
export class CompetitionsController {

    constructor(competitionsService) {
        this.competitionsService = competitionsService;
    }

    /**
     * Retorna todas as competições cadastradas
     */
    @Get()
    @Bind(Query())
    findAll(query) {
        return this.competitionsService.findAll(query);
    }

    /**
     * Persiste uma nova competição
     * @param {*} competition 
     */
    @Post()
    @UseFilters(new HttpExceptionFilter())
    @Bind(Body())
    create(competition) {
        this.competitionsService.save(competition);
    }
}
