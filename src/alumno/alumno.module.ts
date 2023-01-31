import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Alumno, AlumnoSchema } from './entities/alumno.entity';

@Module({
  controllers: [AlumnoController],
  providers: [AlumnoService],
  imports: [
    MongooseModule.forFeature([
      {
        name:Alumno.name,
        schema: AlumnoSchema
      }
    ])
  ],
})
export class AlumnoModule {}
