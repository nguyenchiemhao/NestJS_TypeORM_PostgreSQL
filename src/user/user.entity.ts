import { FilmEntity } from './../film/film.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt'
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    fullName: string;

    @Column()
    age: number;

    @Column({ default: true })
    status: boolean;

    @Column({ default: null })
    accessToken: string;

@OneToMany(type => FilmEntity, film => film.user, { eager: true })
    films: FilmEntity[];

    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return this.password === hash;
    }
}
