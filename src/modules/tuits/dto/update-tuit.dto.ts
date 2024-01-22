/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class UpdateTuitDto {
    @IsString() // CUANDO SE ENVIE UNA PETICION A ALGO QUE CONTENGA ESTE DTO, PEUS ESTA PROPIEDAD TIENE QUE EXISITIR Y SER STRING
    readonly message: string; 
}
