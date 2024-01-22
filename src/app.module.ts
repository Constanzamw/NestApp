/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TuitsModule } from './modules/tuits/tuits.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), // is global para no importarto en todos los modulos, sino que con hacerlo aca ya esta!
    DatabaseModule,
    TuitsModule, 
    UsersModule, 
  ],

})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService){
    AppModule.port = +this.configService.get("PORT") // el + nos asegura que es un number
  }
}
