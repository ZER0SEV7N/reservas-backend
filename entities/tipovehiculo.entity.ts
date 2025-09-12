import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Vehiculo } from './vehiculo.entity';

@Entity('tipo_vehiculo')
export class TipoVehiculo {
    @PrimaryGeneratedColumn({
    name: 'id_tipo'})
    id_tipo: number;
    
    @Column({ name: 'nombre_tipo',
    type: 'varchar',
    length: 20,})
    nombre_tipo: string;

    @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.tipoVehiculo)
    vehiculos: Vehiculo[];

}