import { AuthController } from '../auth/controllers/auth.controller';
import { AuthService } from '../auth/services/auth.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config'
import { userSchema } from '../auth/auth.schema';
import { LoggerModule } from 'nestjs-pino';
import { Options } from 'pino-http';


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_DB), //En esta línea, conectamos el proyecto con la base de datos.
  MongooseModule.forFeature([{ name: 'usarios', schema: userSchema }]),   //En name va el nombre de la tabla (no de la DB) y en Schema va la constante que resulta de la clase con el decorador @Schema.
  LoggerModule.forRoot({
    pinoHttp: {
      safe: true,
      // prettyPrint: process.env.NODE_ENV !== 'production',
    } as any,  // Ignora la verificación de tipos para este objeto
  }),
  //Para que funcione el logger de Pino.
  ],
  controllers: [
    AuthController, AppController], //Tengo que poner TODOS los controladores que deben funcionar en el proyecto. (Aunque no hagan nada en la base de datos)
  providers: [
    AuthService, AppService], //Si tengo un controlador pero no tengo su servicio correspondiente (y viceversa), peta. 
})
export class AppModule { }
