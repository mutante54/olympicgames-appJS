import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception especializada para o módulo de competições (Genérica)
 */
export class CompetitionGenericException extends HttpException {
    constructor(message) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}