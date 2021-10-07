import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception especializada para o módulo de competições
 */
export class CompetitionException extends HttpException {
    constructor(message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}