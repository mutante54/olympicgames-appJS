import { Controller, Dependencies, Post, Body, Get, Bind, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../http-exception.filter';
import { CompetitionException } from './competition.exception';
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
    findAll() {
        return this.competitionsService.findAll();
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
