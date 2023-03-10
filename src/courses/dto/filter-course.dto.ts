import { IsString } from "class-validator";

export class FilterCourseDto{
    @IsString()
    description:string
}