import { AuthDTO } from './dto/auth.dto';
import { UserService } from './../user/user.service';
import { CreateUserDTO } from './../user/dto/createUser.dto';
import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthRepository) private authRepository: AuthRepository, private userService: UserService) {
    }

    async signUp(createUserDto: CreateUserDTO): Promise<void> {
        await this.userService.createUser(createUserDto);
    }

    async signIn(authDto: AuthDTO): Promise<{ accessToken: string }> {
        return await this.userService.login(authDto);
    }

}
