import { isNumber, IsNumber, isString, IsString } from "class-validator";

export class CreateModuleDto {
    @IsNumber()
   courseId:number; 
   @IsString()
    title: string
    numberOfLectures:number;
    duration:string;
    index: number
}
