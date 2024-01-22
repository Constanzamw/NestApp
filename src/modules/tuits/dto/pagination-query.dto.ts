/* eslint-disable prettier/prettier */
import { IsNumber, IsPositive,IsOptional } from "class-validator";

/* eslint-disable prettier/prettier */
export class PaginationQueryDto{
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    offset: number;
}