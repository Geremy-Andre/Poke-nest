import { PartialType } from '@nestjs/mapped-types';
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';
import { CreateAlumnoDto } from './create-alumno.dto';

export class UpdateAlumnoDto extends PartialType(CreateAlumnoDto) {

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;
    @IsString()
    @MinLength(1)
    nombre:string;
    @IsDate()
    @Type(()=>Date)
    fecha_nac:Date;
    @IsBoolean()
    sexo:boolean;
}
