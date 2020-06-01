import { FilmRepository } from './film.repository';
import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FilmRepository])],
  controllers: [FilmController],
  providers: [FilmService]
})
export class FilmModule { }
