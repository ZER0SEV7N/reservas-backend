import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateVehiculoDto {

    @IsNumber()
    id_tipo: number;

    @IsString()
    placa: string;

    @IsString()
    marca: string;

    @IsString()
    modelo: string;

    @IsString()
    ano_modelo: string;

    @IsNumber()
    pasajeros: number;

    @IsNumber()
    peso_max: number;

}