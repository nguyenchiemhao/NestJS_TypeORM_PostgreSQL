import { SearchFilmDTO } from './dto/searchFilm.dto';
import { CreateFilmDTO } from './dto/createFilm.dto';
import { User } from 'src/user/user.entity';
import { NotFoundException } from '@nestjs/common';
import { FilmEntity } from './film.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateFilmDTO } from './dto/updateFilm.dto';

@EntityRepository(FilmEntity)
export class FilmRepository extends Repository<FilmEntity> {
    findByName(clientName: string) {
        return this.findOne({ where: { clientName } });
    }

    async getAll(searchFilmDto: SearchFilmDTO, user: User): Promise<FilmEntity[]> {
        const { isActive, search } = searchFilmDto;

        const query = this.createQueryBuilder('film_entity');

        query.where('film_entity.userId = :userId', { userId: user.id })

        if (isActive) {
            query.andWhere('film_entity.isActive = :isActive', { isActive: isActive })
        }

        if (search) {
            query.andWhere('film_entity.name LIKE :search OR film_entity.url LIKE :search', { search: `%${search}%` })
        }

        return await query.getMany();
    }

    async findOneFilm(id: number, user: User): Promise<FilmEntity> {

        const found = this.findOne({ where: { id, userId: user.id } })

        if (!found) {
            throw new NotFoundException(`Could not found film which has id : ${id}`)
        }
        return found
    }

    async createOne(createFilmDto: CreateFilmDTO, user: User): Promise<FilmEntity> {

        const { name, url, isActive } = createFilmDto

        const film = new FilmEntity();

        film.name = name;
        film.url = url;
        film.isActive = isActive;
        film.user = user;
        await film.save();
        delete film.user
        return film;
    }

    async updateOne(id: number, updateFilmDto: UpdateFilmDTO, user: User): Promise<FilmEntity> {
        const { name, url, isActive } = updateFilmDto

        const film = await this.findOneFilm(id, user);

        if (name && name != '') {
            film.name = name
        }
        if (url && url != '') {
            film.url = url
        }
        if (isActive) {
            film.isActive = isActive
        }

        return await film.save();
    }

    async deleteOne(id: number, user: User): Promise<void> {
        const result = await this.delete({ id, userId: user.id })

        if (result.affected === 0) {
            throw new NotFoundException(`Not found film which has id: ${id}`)
        }
    }
}
