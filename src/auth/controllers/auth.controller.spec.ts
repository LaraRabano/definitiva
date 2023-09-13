// Importaciones de librerías y módulos
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import mongoose from 'mongoose';

// Importaciones locales
import { AppModule } from '../../app/app.module';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import e from 'express';

// Descripción del conjunto de pruebas
describe('AuthController (e2e)', () => {   // e2e = end to end
    let app;
    let authService = { login: jest.fn() };

    // Configuración inicial antes de todas las pruebas
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: authService,
                },
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    }, 20000);  // Tiempo de espera extendido a 20 segundos

    // Descripción de pruebas para la ruta GET /auth
    describe('GET /auth', () => {
        it('should return user data  ans 200 if credentials are valid', async () => {
            authService.login.mockResolvedValue({ name: 'lara', password: '123' }); // Mockeamos el método login de authService para que devuelva un objeto con name y password.

            const result = await request(app.getHttpServer())
                .get('/auth')
                .send({ name: 'lara', password: '123' })

            expect(result.body).toEqual({ name: 'lara', password: '123' });
            expect(result.statusCode).toEqual(200);

        }, 20000);  // Tiempo de espera extendido a 20 segundos

        it('should return 400 if credentials are invalid', async () => {
            authService.login.mockResolvedValue(null);

            const result = await request(app.getHttpServer())
                .get('/auth')
                .send({ name: 'wrongName', password: 'wrongPassword' })

            expect(result.statusCode).toEqual(400);
        }, 20000);  // Tiempo de espera extendido a 20 segundos

    });

    // Limpieza después de todas las pruebas
    afterAll(async () => {
        await app.close();  // Cierra la aplicación NestJS
        await mongoose.disconnect();  // Desconecta de Mongoose
    }, 20000);  // Tiempo de espera extendido a 20 segundos
});
