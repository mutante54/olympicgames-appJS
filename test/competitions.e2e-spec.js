import request from 'supertest';
import { Test } from '@nestjs/testing';
import { CompetitionsController } from '../src/competitions/competitions.controller';
import { CompetitionsService } from '../src/competitions/competitions.service';

/**
 * Testes integrados para o módulo de competições
 * Irá validar a criação de uma competição (POST) e verificar se o serviço GET trará resultados (200 OK)
 */

describe('CompetitionsController (e2e)', () => {
    let app;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            controllers: [CompetitionsController],
            providers: [CompetitionsService],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/POST Create /', () => {
        return request(app.getHttpServer())
            .post('/competitions')
            .set('Content-type', 'application/json')
            .send({
                sportType: 'SOCCER',
                eventPlace: 'Arena 200',
                dateTimeStarts: 'Wed, 07 Oct 2021 02:00:00 GMT-0300',
                dateTimeFinish: 'Wed, 07 Oct 2021 04:10:00 GMT-0300',
                nation1: 'Brazil',
                nation2: 'Russia',
                stageType: 'GROUP_STAGE'
            })
            .expect(201);
    });

    it('/GET FindAll /', () => {
        return request(app.getHttpServer())
            .get('/competitions')
            .expect(200);
    });
});
