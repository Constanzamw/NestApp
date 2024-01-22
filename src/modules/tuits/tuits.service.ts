/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Tuit } from './tuit.entity';
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities';

// este tuit service sera el responsable de manejar la info y aplicar la logica a nuestros tuits y el proveedor principal del controller.
@Injectable()
export class TuitsService {
  
    constructor(
       @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
       @InjectRepository(User) private readonly userRepository: Repository<User>
       ) {} // typeorn tiene la clase REPOSITORY y le pasamos la entidad que creamos.

    

//PONEMOS LOS METODOS EN LA CLASE TUITSERVICE QUE VAN A INTERACTUAR CON NUSTRA COLECCION DE TUITRS

   async getTuits({limit, offset}: PaginationQueryDto): Promise<Tuit[]> { 
        return await this.tuitRepository.find({
              relations:["user"],
              skip: offset, 
              take:limit
          }); //find metodo de typerorm, ahce un selectAll a nivel sql.
    }

   async getTuit(id: number): Promise<Tuit> {
        const tuit: Tuit = await this.tuitRepository.findOne({
          where: { id },
          relations: ["user"], 
        });

        if(!tuit){
            throw new NotFoundException("Resource not found")// NotFoundException es una clase que viene de nest/common
        }

        return tuit;
    }

    async createTuit({message, user}: CreateTuitDto){
       const tuit =  this.tuitRepository.create({message , user});
       return this.tuitRepository.save(tuit);
    }

    async updateTuit(id:number, {message}:UpdateTuitDto) { 
        // const tuit: Tuit = await this.tuitRepository.preload({
        //     id,
        //     message
        // })
        // if(!tuit){
        //     throw new NotFoundException("Resource not found")
        // }
       
        // return tuit;
        const existingTuit: Tuit = await this.tuitRepository.findOneBy({id});

        if (!existingTuit) {
          throw new NotFoundException("Resource not found");
        }
      
        // Aquí utilizamos preload para cargar los datos del Tuit existente
        const updatedTuit: Tuit = await this.tuitRepository.preload({
          id,
          message,
        });
      
        // Si updatedTuit es null, significa que preload no encontró el Tuit
        if (!updatedTuit) {
          throw new NotFoundException("Resource not found");
        }
      
        // Guardamos los cambios en la base de datos
        return this.tuitRepository.save(updatedTuit);
      }
    

    async removeTuit(id:number) : Promise<void> {
      const tuit : Tuit = await this.tuitRepository.findOneBy({id});
      if(!tuit){
        throw new NotFoundException("Resource not found")
    }
       this.tuitRepository.remove(tuit)
    }


}
