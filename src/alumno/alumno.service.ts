import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnoService {

  constructor(
    @InjectModel(Alumno.name)
    private readonly alumnoModel: Model<Alumno>
  ){}
  async create(createAlumnoDto: CreateAlumnoDto) {  
    createAlumnoDto.nombre=createAlumnoDto.nombre.toLocaleLowerCase();
    let dateTimeDiff = Math.abs(Date.now() - createAlumnoDto.fecha_nac.getTime());
    let age = Math.floor((dateTimeDiff / (1000 * 3600 * 24))/365.25);
    const alum = {
      ...createAlumnoDto,
      edad:age
    }
    try {
      const alumno=await this.alumnoModel.create(alum);
      return alumno;
    } catch (error) {
      if(error.code===11000){
        throw new BadRequestException(`Person exist in DB ${JSON.stringify(error.keyValue)}`);
      }else{
        console.log(error);
        throw new InternalServerErrorException(`Can´t create a Person - check the server logs` );
        
      }  
    }
    
  }

  findAll() {
    return this.alumnoModel.find();
  }

  async findOne(term: string) {
    let persona:Alumno;
    if(!isNaN(+term)){
      persona=await this.alumnoModel.findOne({no:term})
    }
    //Mongo DB ID
    if(!persona && isValidObjectId(term)){
      persona=await this.alumnoModel.findById(term)
    }
    //name
    if(!persona ){
      persona=await this.alumnoModel.findOne({nombre:term.toLowerCase().trim()})
    }
    
    if(!persona){
      throw new NotFoundException(`Pokemon witd id, name or no "${term}" not found`);
      
    }
    return persona;
  }

  async update(term: string, updateAlumnoDto: UpdateAlumnoDto) {
    const persona=await this.findOne(term);
    if(updateAlumnoDto.nombre){
      updateAlumnoDto.nombre=updateAlumnoDto.nombre.toLowerCase();
    }
    await persona.updateOne(updateAlumnoDto);
    
    return {...persona.toJSON(), ...updateAlumnoDto};
  }

  remove(id: number) {
    return `This action removes a #${id} alumno`;
  }
}
