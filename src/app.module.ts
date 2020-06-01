import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfiguration } from './configuration/typeorm.configuration';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FilmModule } from './film/film.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfiguration), UserModule, AuthModule, FilmModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
