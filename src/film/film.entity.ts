import { User } from './../user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';

@Entity()
export class FilmEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column({ default: true })
    isActive: string;

    @ManyToOne(type => User, user => user.films, { eager: false })
    user: User;

    @Column()
    userId: number;
}
