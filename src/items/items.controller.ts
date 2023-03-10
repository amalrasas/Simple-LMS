import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ReorderItemDto } from './dto/reorder-item-dto';
import { CreateCommentDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update({id:+id}, updateItemDto);
  }
  @Patch()
  updateReorder(@Body() reorderItemDto:ReorderItemDto[]){
    return this.itemsService.updateIndex(reorderItemDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove({id:+id});
  }
 /* @Post('/comment')
  addComment(@Body() comment:CreateCommentDto){
    return this.itemsService.addComment(comment)
  }
  @Get('/comments')
  findComment(){
   
    return this.itemsService.findComment()
  }*/
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne({id:+id});
  }
}
