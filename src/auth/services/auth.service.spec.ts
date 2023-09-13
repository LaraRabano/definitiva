import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { PinoLogger } from 'nestjs-pino';
import { mock } from 'node:test';

describe('AuthService', () => {
    let service: AuthService;
    let mockModel;
    let mockLogger;

    beforeEach(async () => {
        mockModel = {
            findOne: jest.fn()  //Eso hace que el método findOne de login, consulte la DB Mockeada. Si no lo hiciésemos, haría la consulta a la DB real. 
        };

        mockLogger = {setContext: jest.fn(),
            info: jest.fn(),
            error: jest.fn(),};

        const module: TestingModule = await Test.createTestingModule({ //Creamos una variable llamada module de tipo TestingModule que "hereda" de Test.createTestingModule.
            providers: [
                AuthService,
                {
                    provide: getModelToken('usarios'), 
                    useValue: mockModel, 
                    
                },
                {
                    provide: PinoLogger, 
                    useValue: mockLogger, 
                    
                }

            ],
        }).compile(); //Compila el módulo de pruebas. Es necesario para que todo funcione bien para las pruebas.

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('login', () => {
        it('should return user data if credentials are valid', async () => {
            const mockUser = { name: 'existingNamek', password: 'existingPassword' };
            mockModel.findOne.mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockUser),  //Redefinimos el funcionamiento del método findOne.
            });


            const result = await service.login({ name: 'existingName', password: 'existingPassword' }); //Hacemos la llamadas a la DB Mockeada a través del método login para comprobar que funciona correctamente. 
            console.log('result', result, 'mockUser', mockUser)
            expect(result).toEqual(mockUser);  //Comparativa entre lo que devuelve el método login y lo que devuelve la DB Mockeada.
        });

        it('should return null if credentials are invalid', async () => {
            mockModel.findOne.mockReturnValue({
                exec: jest.fn().mockResolvedValue(null),   //Establecemos que el método findOne devuelva null.
            });
        
            const result = await service.login({ name: 'wrongName', password: 'wrongPassword' });  //Comprobamos que la llamada al método login devuelve null.
            expect(result).toBeNull(); //Como es Null, no hace falta comparar con la DB, basta con usar el método toBeNull().
        });
        
    });
});
