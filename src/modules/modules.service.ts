import { Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ReorderModuleDto } from './dto/reorder-module.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { PaginateItemDto } from './dto/paginate-item.dto';
@Injectable()
export class ModulesService {
  constructor(private prismaService: PrismaService) {}
  create(createModuleDto: CreateModuleDto) {
    return this.prismaService.module.create({ data: createModuleDto });
  }

  findAll() {
    return this.prismaService.module.findMany({
     
    });
  }

  findOne(moduleWhereUniqueInput: Prisma.ModuleWhereUniqueInput) {
    return this.prismaService.module.findUnique({
      where: moduleWhereUniqueInput,
    });
  }

  update(where: Prisma.ModuleWhereUniqueInput, data: UpdateModuleDto) {
    return this.prismaService.module.update({ where, data });
  }
  /*updateIndex(data:ReorderModuleDto[]){
    console.log(data)
    for(const module of data){
      return this.prismaService.module.update({where:{id:module.id},data:{index:module.index}})
      
    }

  }*/
  async updateIndex(reorderedindexes: ReorderModuleDto[]) {
    console.log(reorderedindexes);
    return Promise.all(
      reorderedindexes.map((reorderedindexes) => {
        return this.prismaService.module.update({
          where: {
            id: reorderedindexes.id,
          },
          data: {
            index: reorderedindexes.index,
          },
        });
      }),
    );
  }
  getAllItems(id:number,paginateItemDto:PaginateItemDto){
    return this.prismaService.item.findMany({
     where:{moduleId:id},
      orderBy:[
        {
          index:Prisma.SortOrder.asc,
        },
        
      ],
      take:paginateItemDto.take,
    })
  }

  remove(courseWhereUniqueInput: Prisma.CourseWhereUniqueInput) {
    return this.prismaService.module.delete({ where: courseWhereUniqueInput });
  }
}
