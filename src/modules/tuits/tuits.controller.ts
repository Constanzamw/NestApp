/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Body , Post,Patch, Delete, Query} from '@nestjs/common';
import { TuitsService } from './tuits.service';
import { Tuit } from './tuit.entity';
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
@Controller('tuits')
export class TuitsController {
constructor(private readonly tuitService: TuitsService){

}

    @Get()
    getTuits(@Query() pagination: PaginationQueryDto): Promise<Tuit[]> { // buena practica poner el tipo de retorno de nuestros metodos! --- ya no es mas :string sino que lo tengo que cambiar al tuit
               
      return this.tuitService.getTuits(pagination)
    }
  
    @Get(':id') //tuits/1  --> parametros siembre viajan como string
    getTuit(@Param('id') id: number) : Promise<Tuit> { // aca no pongo Tuit[] porque retorna UN UNICO TUIT, no el array! 👀
        //return `Your tuit id is ${id}`;
        return this.tuitService.getTuit(id)
    }
    @Post()
    createTuit(@Body() message: CreateTuitDto):Promise<Tuit> { 
        return this.tuitService.createTuit(message)
    }

    @Patch(":id") //
    updateTuit(@Param("id") id: number, @Body() tuit: UpdateTuitDto ): Promise<Tuit> { 
        //return `The tuit ${id} has been updated`
        return this.tuitService.updateTuit(id, tuit) // tuit que recibimos x body
    }
    @Delete(':id') //
    removeTuit(@Param('id') id: number ): Promise<void>{ // TAMPOCO PONGO XQ NO RETORNA NADA!! (VALIDAR TUITS.SERVICE.TS) le ponemos:void
        //return `The tuit ${id} has been deleted`
        return this.tuitService.removeTuit(id)
    }



}

