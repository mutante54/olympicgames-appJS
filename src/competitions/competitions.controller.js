import { Controller, Dependencies, Post, Body, Get, Bind } from '@nestjs/common';
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
    @Bind(Body())
    save(competition) {
        this.competitionsService.save(competition);
    }
}
