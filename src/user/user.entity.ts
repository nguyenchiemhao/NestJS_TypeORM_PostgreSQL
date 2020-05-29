import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from 'typeorm';
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

    async validatePassword(password) {
        const hash = await bcrypt.hash(password, this.salt);
        return this.password === hash;
    }
}
