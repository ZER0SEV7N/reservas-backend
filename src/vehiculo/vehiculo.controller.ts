import { 
  Controller, Get, Post, Body, Put, Delete, Param, 
  UseInterceptors, UploadedFiles, ParseIntPipe 
} from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';

@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Get()
  getAll() {
    return this.vehiculoService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculoService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'TIV', maxCount: 1 },
        { name: 'CITV', maxCount: 1 },
        { name: 'soat', maxCount: 1 },
      ],
      { limits: { fileSize: 5 * 1024 * 1024 } },
    ),
  )
  async create(
    @Body() body: CreateVehiculoDto,
    @UploadedFiles()
    files: { 
      TIV?: Express.Multer.File[]; 
      CITV?: Express.Multer.File[]; 
      soat?: Express.Multer.File[] 
    },
  ) {
    const payload: any = { ...body };

    // asignar relación con TipoVehiculo
    if (body.id_tipo) {
      payload.tipoVehiculo = { id_tipo: Number(body.id_tipo) };
      delete payload.id_tipo;
    }

    if (files?.TIV?.[0])  payload.TIV = files.TIV[0].buffer;
    if (files?.CITV?.[0]) payload.CITV = files.CITV[0].buffer;
    if (files?.soat?.[0]) payload.soat = files.soat[0].buffer;

    return this.vehiculoService.create(payload);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'TIV', maxCount: 1 },
        { name: 'CITV', maxCount: 1 },
        { name: 'soat', maxCount: 1 },
      ],
      { limits: { fileSize: 5 * 1024 * 1024 } },
    ),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFiles()
    files: { 
      TIV?: Express.Multer.File[]; 
      CITV?: Express.Multer.File[]; 
      soat?: Express.Multer.File[] 
    },
  ) {
    const payload: any = { ...body };

    if (body.id_tipo) {
      payload.tipoVehiculo = { id_tipo: Number(body.id_tipo) };
      delete payload.id_tipo;
    }

    if (files?.TIV?.[0])  payload.TIV = files.TIV[0].buffer;
    if (files?.CITV?.[0]) payload.CITV = files.CITV[0].buffer;
    if (files?.soat?.[0]) payload.soat = files.soat[0].buffer;

    return this.vehiculoService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculoService.remove(id);
  }
}
