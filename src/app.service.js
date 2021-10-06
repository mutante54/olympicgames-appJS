import { Injectable, Dependencies } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(configService) {
    this.configService = configService;
  }
  getHello() {
    return 'Olympic Games API V1';
  }
}
