import { Controller, Get, Param } from '@nestjs/common';
import { TipoVehiculoService } from './tipo_vehiculo.service';

@Controller('tipo-vehiculo')
export class TipoVehiculoController {
  constructor(private readonly tipoVehiculoService: TipoVehiculoService) {}

  @Get()
  getAll() {
    return this.tipoVehiculoService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.tipoVehiculoService.findOne(id);
  }
}
