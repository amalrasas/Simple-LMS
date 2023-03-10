import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ReorderModuleDto } from './dto/reorder-module.dto';
import { PaginateItemDto } from './dto/paginate-item.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.create(createModuleDto);
  }
/* @Get()
  findAll() {
    return this.modulesService.findAll();
  }*/
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id:number) {
    return this.modulesService.findOne({id:+id});
  }
  @Get(':id/items')
  getItems(@Param('id') id:string,@Query() paginateItemDto: PaginateItemDto){
    console.log(paginateItemDto)
    return this.modulesService.getAllItems(+id,paginateItemDto)

  }
   
  @Patch(':courseId')
  update(@Param('courseId') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update({id:+id}, updateModuleDto);
  }
  
  @Patch()
  updateOrder( @Body() reordereModuleDto: ReorderModuleDto[]){
  console.log(reordereModuleDto)
    return this.modulesService.updateIndex(reordereModuleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove({id:+id});
  }
}
