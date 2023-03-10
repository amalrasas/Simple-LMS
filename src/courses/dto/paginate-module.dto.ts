import { Transform, Type } from "class-transformer";
import { IsInt } from "class-validator";
export class PaginateModuleDto{
    @IsInt()
   @Type(() => Number)
    take:number

}