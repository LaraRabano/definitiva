import { Injectable } from '@nestjs/common';

@Injectable()   //Hace que esta clase se pueda usar en otras partes del código. 
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
