//Importar las dependencias necesarias para definir la entidad Vehiculo
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { TipoVehiculo } from "./tipovehiculo.entity";

@Entity('vehiculo')
export class Vehiculo {
    @PrimaryGeneratedColumn('increment', { name: 'id_vehiculo' })
    id_vehiculo: number;

    @Column({ name: 'placa',
    type: 'varchar',
    length: 30,})
    placa: string;

    @Column({ name: 'marca',
    type: 'varchar',
    length: 30,})
    marca: string;

    @Column({ name: 'modelo',
    type: 'varchar',
    length: 30,})
    modelo: string; 

    @Column({ name: 'ano_modelo',
    type: 'varchar',
    length: 4,})
    ano_modelo: string;
    
    @Column({ name: 'pasajeros',
    type: 'int',})
    pasajeros: number;

    @Column({ name: 'peso_max',
    type: 'double',})
    peso_max: number;

    @Column({ name: 'TIV', 
    type: 'longblob',
    nullable: true})
    TIV: Buffer;

    @Column({ name: 'CITV', 
    type: 'longblob',
    nullable: true})
    CITV: Buffer;

    @Column({ name: 'soat', 
    type: 'longblob',
    nullable: true})
    soat: Buffer;
    
    @ManyToOne(() => TipoVehiculo, (tipo) => tipo.vehiculos)
    @JoinColumn({ name: 'id_tipo'})
    tipoVehiculo: TipoVehiculo;
}
    