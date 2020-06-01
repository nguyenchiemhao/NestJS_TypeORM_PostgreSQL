import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateFilmDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    name: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    isActive: string;
}