import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaPostgresService } from 'src/prismapostgres.service';
@Module({
  controllers: [CoursesController],
  providers: [CoursesService,PrismaService,PrismaPostgresService]
})
export class CoursesModule {}
