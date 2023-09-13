/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';


@Injectable()
export class AuthService {

    constructor(
        private readonly logger: PinoLogger,
        @InjectModel('usarios') private readonly usariosModel: Model<any>
    ) { logger.setContext(AuthService.name) }

    async login(body: any) {
        // console.log({body}) //Si quieres ver el nombre de la variable y su contenido, meterlo entre llaves. 
        // console.table([{id:1, val: "asd"}, {id:2, val: "aa"}])

        this.logger.info('Iniciando sesión', { body });  // Registrar el inicio de sesión en el log.

        const payload_body = { name: body.name, password: body.password };

        const data = await this.usariosModel.findOne(payload_body).exec(); //Esta función comprueba que el Name que llega en el body, se corresponde con un name de la db = el user existe. 


        return data
    }
}