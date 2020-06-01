import { UpdateUserDTO } from './dto/updateUser.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get()
    async getAllUser(): Promise<User[]> {
        return this.userService.getAllUser()
    }

    @Get(':id')
    async getOneUser(@Param() param): Promise<User> {
        return this.userService.findOne(param.id)
    }

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
        return await this.userService.createUser(createUserDTO);
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id, @Body() updateUserDTO: UpdateUserDTO): Promise<User> {
        return await this.userService.updateUser(id, updateUserDTO);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id): Promise<void> {
        await this.userService.deleteOne(id);
    }

    @Post('/test')
    test(@GetUser() user: User) {
        console.log(user)
    }
}
