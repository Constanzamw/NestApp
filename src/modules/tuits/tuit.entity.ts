/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/entities";

@Entity()
export class Tuit{
    @PrimaryGeneratedColumn("increment")
    id?: number

    @Column()
    message:string

   //agregamos la relacion con user

   @ManyToOne(type => User, user=>user.tuits, {cascade: true}) // en la clase usuario declaramos una propiedad llamada tuits.
   @JoinColumn({name:"user_id"}) // tabla intermedia
   user: User;
}   