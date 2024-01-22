/* eslint-disable prettier/prettier */
import { IsObject, IsString,  } from "class-validator";
import { User } from "src/modules/users/entities";
/* eslint-disable prettier/prettier */
export class CreateTuitDto {
    @IsString() // CUANDO SE ENVIE UNA PETICION A ALGO QUE CONTENGA ESTE DTO, PEUS ESTA PROPIEDAD TIENE QUE EXISITIR Y SER STRING
    readonly message: string; // CREAMOS PROPIEDAD A LA CLASE

    @IsObject()
    readonly user: Partial<User>; //



}
