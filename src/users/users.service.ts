import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService:PrismaService){}
  async getMyUser(id:number,req:Request){
    const user= await this.prismaService.user.findUnique({where:{id}})
    if(!user){
      throw new NotFoundException()
    }
    const decodedUser=req.user as {id:number,email:string}
    if(user.id!==decodedUser.id){
      throw new ForbiddenException()
    }
    delete user.hashedPassword
    return {user}
  }
  async getUsers(){
    return this.prismaService.user.findMany({select:{
      id:true,
      email:true
    }})
  }

}
