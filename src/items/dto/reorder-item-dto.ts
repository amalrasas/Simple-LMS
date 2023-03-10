import { isNumber, IsNumber } from "class-validator"

export class ReorderItemDto{
    @IsNumber()
    id:number
    index:number
}