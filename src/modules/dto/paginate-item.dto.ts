import { Type } from "class-transformer";
import { IsNumber} from "class-validator";
export class PaginateItemDto{
    @Type(() => Number)
    @IsNumber()
    take:number
}