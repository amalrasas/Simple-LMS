import { IsNumber, isString, IsString} from "class-validator"

export class CreateItemDto {
    @IsNumber() 
    moduleId:number
    @IsString()
    type:string 
  
    duration: string
   @IsNumber() 
   index:number
}
export class CreateCommentDto{
    @IsString()
    content:string
}