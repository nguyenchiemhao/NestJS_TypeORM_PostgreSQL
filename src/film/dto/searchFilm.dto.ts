import { IsString } from "class-validator"

export class SearchFilmDTO {
    isActive: boolean
    search: string
}