import { SearchFilmDTO } from './dto/searchFilm.dto';
import { User } from 'src/user/user.entity';
import { UpdateFilmDTO } from './dto/updateFilm.dto';
import { CreateFilmDTO } from './dto/createFilm.dto';
import { FilmService } from './film.service';
import { Controller, Get, Param, Delete, Post, Body, Patch, ParseIntPipe, UseGuards, Query, ParseBoolPipe, ValidationPipe, UsePipes } from '@nestjs/common';
import { FilmEntity } from './film.entity';
import { GetUser } from 'src/user/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('films')
@UseGuards(AuthGuard('jwt'))
export class FilmController {

    constructor(private filmService: FilmService) { }

    @Get()
    async getAll(
        @Query() searchFilmDto: SearchFilmDTO,
        @GetUser() user: User
    ): Promise<FilmEntity[]> {
        return await this.filmService.getAll(searchFilmDto, user);
    }

    @Get(':id')
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<FilmEntity> {
        return await this.filmService.findOne(id, user);
    }

    @Delete(':id')
    async deleteOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
        return await this.filmService.deleteOne(id, user);
    }

    @Post()
    async create(@Body() createFilmDto: CreateFilmDTO, @GetUser() user: User): Promise<FilmEntity> {
        return await this.filmService.createOne(createFilmDto, user);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateFilmDto: UpdateFilmDTO, @GetUser() user: User): Promise<FilmEntity> {
        return await this.filmService.updateOne(id, updateFilmDto, user);
    }
}
