import { IsString, MaxLength, MinLength, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    fullName: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(32)
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @Min(14)
    @Max(200)
    age: number;

    status: boolean;
}