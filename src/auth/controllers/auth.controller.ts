import { Body, Controller, Get, Headers, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly logger: PinoLogger,
    ) { logger.setContext(AuthController.name); }

    @Get()
    async get_login(@Body() body: any, @Headers() header: any, /* ...rest */ @Res() res: Response): Promise<any> {  //rest = args, kwargs
        try {
            this.logger.warn('Drama', { body, header });
            const val = await this.authService.login(body);
            return (val === null) ? res.status(400).send('Algo salió mal') : res.status(200).send(val) // Esto es un if ternario. Consultar. 
        } catch (e) {
            this.logger.info('Algo salió mal', e);
            return res.status(400).send('Algo salió mal');
        }
    }
}
