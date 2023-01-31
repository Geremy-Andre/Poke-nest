import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Alumno extends Document{

    // _id: string - MongoDB nos lo proporciona
    @Prop({
        unique: true,
        index: true,
    })
    no: number;
    @Prop({
        unique: false,
        index: true,
    })
    nombre: string;
    @Prop()
    fecha_nac: string;

    @Prop()
    sexo: boolean;
    @Prop()
    edad:number;

}

export const AlumnoSchema = SchemaFactory.createForClass( Alumno );