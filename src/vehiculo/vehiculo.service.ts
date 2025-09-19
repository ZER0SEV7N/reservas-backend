import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from '../entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';

@Injectable()
export class VehiculoService {
  constructor(
          @InjectRepository(Vehiculo)
          private repo: Repository<Vehiculo>,
      ) {}

   async findAll() {
    const vehs = await this.repo.find();
    return vehs.map(v => ({
      ...v,
      TIV: v.TIV ? v.TIV.toString('base64') : null,
      CITV: v.CITV ? v.CITV.toString('base64') : null,
      soat: v.soat ? v.soat.toString('base64') : null,
  }));
  }

findOne(id: number) {
  return this.repo.find({
    where: { id_vehiculo: id },
    relations: ['tipoVehiculo'],
  });
}


    async create(data: Partial<Vehiculo>) {
        const vehiculo = this.repo.create(data);
        return this.repo.save(vehiculo);
    }

    async update(id: number, changes: Partial<Vehiculo>) {
        await this.repo.update(id, changes);
        return this.repo.findOne({ where: { id_vehiculo: id } });
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}