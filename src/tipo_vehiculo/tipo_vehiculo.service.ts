import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoVehiculo } from '../entities/tipovehiculo.entity';
import { CreateTipoDto } from './dto/create-tipo.dto';

@Injectable()
export class TipoVehiculoService {
    constructor(
        @InjectRepository(TipoVehiculo)
        private repo: Repository<TipoVehiculo>,
    ) {}

  findAll() {
    return this.repo.find({ relations: ['vehiculos'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id_tipo: id },
      relations: ['vehiculos'],
    });
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}