import { AuthDTO } from './dto/auth.dto';
import { CreateUserDTO } from './../user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { Controller, Get, Body, Post, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() createUserDto: CreateUserDTO): Promise<void> {
        await this.authService.signUp(createUserDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    @HttpCode(200)
    async signIn(@Body() authDto: AuthDTO): Promise<{ accessToken: string }> {
        return await this.authService.signIn(authDto);
    }

}
