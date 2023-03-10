import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get(':id')
  getMyUser(@Param('id') id: string,@Req() req) {
    return this.usersService.getMyUser(+id,req)
  }
  @Get()
  getUsers(){
    return this.usersService.getUsers()
  }

 
}
