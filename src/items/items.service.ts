import { Injectable } from '@nestjs/common';
import { CreateCommentDto, CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ReorderItemDto } from './dto/reorder-item-dto';
import {  Course, Prisma } from '@prisma/client';
//import {comments} from 'node_modules/@internal/prisma-postgres/client'
import { PrismaService } from 'src/prisma.service';
import { PrismaPostgresService } from 'src/prismapostgres.service';
//import {comments,Prisma } from '@prisma/client';
@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService, private pgPrisma:PrismaPostgresService) {}
  create(createItemDto: CreateItemDto) {
    return this.prismaService.item.create({ data: createItemDto });
  }

  findAll() {
    return this.prismaService.item.findMany();
  }

  findOne(itemWhereUniqueInput: Prisma.ItemWhereUniqueInput) {
    return this.prismaService.item.findUnique({ where: itemWhereUniqueInput });
  }

  update(where: Prisma.ItemWhereUniqueInput, data: UpdateItemDto) {
    return this.prismaService.item.update({ where, data });
  }

  async updateIndex(reorderedindexes: ReorderItemDto[]) {
    console.log(reorderedindexes);
    const promises = reorderedindexes.map(async (reorderedindexes) => {
      return this.prismaService.item.update({
        where: {
          id: reorderedindexes.id,
        },
        data: {
          index: reorderedindexes.index,
        },
      });
    });
  }

  remove(where: Prisma.ItemWhereUniqueInput) {
    return this.prismaService.item.delete({ where });
  }
 /* addComment(comment:CreateCommentDto){
    return this.pgPrisma.comments.create({data:{...comment}})

  }
 async findComment(){
  let someCourse:Course[];
    const someComment:comments[]=await this.pgPrisma.comments.findMany()
  }*/

}
