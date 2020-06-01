import { SearchFilmDTO } from './dto/searchFilm.dto';
import { User } from 'src/user/user.entity';
import { UpdateFilmDTO } from './dto/updateFilm.dto';
import { FilmEntity } from './film.entity';
import { FilmRepository } from './film.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFilmDTO } from './dto/createFilm.dto';

@Injectable()
export class FilmService {

    constructor(@InjectRepository(FilmRepository) private filmRepository: FilmRepository) {
    }

    async getAll(searchFilmDto: SearchFilmDTO, user: User): Promise<FilmEntity[]> {
        return await this.filmRepository.getAll(searchFilmDto, user);
    }

    async findOne(id: number, user: User): Promise<FilmEntity> {
        return await this.filmRepository.findOneFilm(id, user)
    }

    async createOne(createFilmDto: CreateFilmDTO, user: User): Promise<FilmEntity> {
        return await this.filmRepository.createOne(createFilmDto, user)
    }

    async updateOne(id: number, updateFilmDto: UpdateFilmDTO, user: User): Promise<FilmEntity> {
        return await this.filmRepository.updateOne(id, updateFilmDto, user);
    }

    async deleteOne(id: number, user: User): Promise<void> {
        return await this.filmRepository.deleteOne(id, user)
    }

}
