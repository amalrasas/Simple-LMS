import { IsNumber } from "class-validator"

export class ReorderModuleDto{
    @IsNumber()
    id:number
    index:number
    
}