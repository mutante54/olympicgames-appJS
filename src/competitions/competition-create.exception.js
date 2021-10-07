import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception especializada para o módulo de competições (Create)
 */
export class CompetitionCreateException extends HttpException {
    constructor(message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}