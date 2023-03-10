import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginateModuleDto } from './dto/paginate-module.dto';
import { PrismaService } from 'src/prisma.service';
import { FilterCourseDto } from './dto/filter-course.dto';
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
  @Get()
  findAll(@Query() filterCourseDto:FilterCourseDto){
    return this.coursesService.findAll(filterCourseDto)
  }
  @Get(':id')
  findOne(@Param('id') id:string){
    return this.coursesService.findOne({id:+id})
  }
  
  @Get(':id/modules')
  getModules(@Param('id') id:string,@Query()  paginateModuleDto:PaginateModuleDto){
    console.log(paginateModuleDto)
    return this.coursesService.getAllModules(+id,paginateModuleDto)

  }
  @Patch(':id')
  update(@Param('id') id:string,@Body() updateCourseDto:UpdateCourseDto){
    return this.coursesService.update({id:+id},updateCourseDto)
  }

  @Delete(':id')
  remove(@Param('id') id:string){
    return this.coursesService.remove({id:+id})
  }
 
}
