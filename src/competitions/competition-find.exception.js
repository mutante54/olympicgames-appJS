import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception especializada para o módulo de competições (Find)
 */
export class CompetitionFindException extends HttpException {
    constructor(message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}