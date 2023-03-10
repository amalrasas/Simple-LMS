import { Injectable, ParseIntPipe } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { PaginateModuleDto } from './dto/paginate-module.dto';
import { FilterCourseDto } from './dto/filter-course.dto';
import { PrismaPostgresService } from 'src/prismapostgres.service';
@Injectable()
export class CoursesService {
  constructor(private prismaService:PrismaService, private pgService:PrismaPostgresService){}
  create(createCourseDto: CreateCourseDto) {
    return this.prismaService.course.create({data:createCourseDto})
  }

  findAll(filterCourseDto:FilterCourseDto) {
    return this.prismaService.course.findMany(
      {
        where:{
          description:{contains:filterCourseDto.description}
        }
      }
    )
  }

  findOne(courseWhereUniqueInput:Prisma.CourseWhereUniqueInput) {
    return this.prismaService.course.findUnique({where:courseWhereUniqueInput})
  }

  update(where:Prisma.CourseWhereUniqueInput, data:Prisma.CourseUpdateInput) {
    return this.prismaService.course.update({where,data})
  }

  remove(where:Prisma.CourseWhereUniqueInput) {
    return this.prismaService.course.delete({where})
  }
  getAllModules(id:number,paginateModuleDto:PaginateModuleDto){
    

    return this.prismaService.module.findMany({
      where:{courseId:id,
      

      },
      orderBy:[
        {
          index:Prisma.SortOrder.asc,
        },
      ],
      take: paginateModuleDto.take
    })
  }
}
