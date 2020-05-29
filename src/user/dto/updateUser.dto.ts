import { IsNumber, Min, Max, IsString, MaxLength } from "class-validator";
export class UpdateUserDTO {

    @IsString()
    @MaxLength(100)
    fullName: string;

    @IsNumber()
    @Min(14)
    @Max(200)
    age: number;

    status: boolean;
}