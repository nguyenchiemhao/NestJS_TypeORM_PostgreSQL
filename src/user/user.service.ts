import { UpdateUserDTO } from './dto/updateUser.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    }

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const { username, password, fullName, age } = createUserDTO;

        const user = new User();
        user.username = username;
        user.password = password;
        user.fullName = fullName;
        user.age = age;
        await user.save()

        return user;
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
}
