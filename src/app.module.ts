import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { TipoVehiculo } from './entities/tipovehiculo.entity';
import { TipoModule } from './tipo_vehiculo/tipo_vehiculo.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';

//Modulo para la conexion a la base de datos
@Module({
  imports: [
    TypeOrmModule.forRoot({
      //Configuracion de la base de datos
      type: 'mysql', //MariaDB
      host: 'localhost', //Servidor local
      port: 3306, //Puerto por defecto de MariaDB
      username: 'root', //Usuario por defecto de MariaDB
      password: '', //Contraseña vacia por defecto de MariaDB
      database: 'reserva', //Nombre de la base de datos
      entities: [Vehiculo, TipoVehiculo], //Entidades que se van a utilizar
      autoLoadEntities: true, //Cargar entidades automaticamente
      synchronize: false, //Sincronizar la base de datos con las entidades
    }),
    VehiculoModule,
    TipoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

