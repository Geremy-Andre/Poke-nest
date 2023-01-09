import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document{

    // _id: string - MongoDB nos lo proporciona
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );