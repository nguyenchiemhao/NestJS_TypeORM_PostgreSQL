import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class AuthDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(32)
    @IsNotEmpty()
    password: string;
}
