import { IsString } from "class-validator";

export class CreateTipoDto {
    @IsString()
    nombre: string;
}