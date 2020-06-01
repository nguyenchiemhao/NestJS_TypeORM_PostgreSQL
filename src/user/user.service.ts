import { JwtPayLoadInterface } from '../auth/jwt-payload.interface';
import { AuthDTO } from './../auth/dto/auth.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository, private jwtService: JwtService) {
    }

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const { username, password, fullName, age } = createUserDTO;

        const salt = await bcrypt.genSalt();

        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;
        user.fullName = fullName;
        user.age = age;
        try {
            return await user.save()
        } catch (error) {
            if (error.code === "23505") { // duplicated username
                throw new ConflictException('Username has existed!')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async updateUser(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {

        const { fullName, age, status } = updateUserDTO;
        const user = await this.findOne(id);

        if (fullName && fullName != '') {
            user.fullName = fullName
        }
        if (age) {
            user.age = age
        }
        if (status) {
            user.status = status
        }

        return await user.save()
    }

    async findOne(id: number): Promise<User> {

        const found = await this.userRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Not found User has id: ${id}`)
        }

        return found;
    }

    async deleteOne(id: number): Promise<void> {

        const result = await this.userRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Not found User has id: ${id}`)
        }
    }

    async login(authDto: AuthDTO): Promise<{ accessToken: string }> {
        const { username, password } = authDto;

        const found = await this.userRepository.findOne({ username })

        if (found) {
            const result = await found.validatePassword(password)
            const payload: JwtPayLoadInterface = { username: found.username, fullName: found.fullName, age: found.age }
            const accessToken: string = await this.jwtService.sign(payload);
            found.accessToken = accessToken;
            const user = await found.save()
            if (result) {
                delete user.password;
                delete user.salt;
                delete user.id;
                return user;
            } else {
                throw new UnauthorizedException('Login Failure!')
            }
        } else {
            throw new UnauthorizedException('Login Failure!')
        }
    }
}
