import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaPostgresService } from 'src/prismapostgres.service';
@Module({
  controllers: [ItemsController],
  providers: [ItemsService,PrismaService,PrismaPostgresService]
})
export class ItemsModule {}
