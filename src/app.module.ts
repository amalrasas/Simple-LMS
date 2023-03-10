import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { ItemsModule } from './items/items.module';
import { CoursesController } from './courses/courses.controller';
import { ModulesController } from './modules/modules.controller';
import { ItemsController } from './items/items.controller';
import { CoursesService } from './courses/courses.service';
import { ModulesService } from './modules/modules.service';
import { PrismaService } from './prisma.service';
import { ItemsService } from './items/items.service';
import { PrismaModule } from './prisma.module';
import { PrismaPostgresService } from './prismapostgres.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    CoursesModule,
    ModulesModule,
    ItemsModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    
    
  ],
  controllers: [CoursesController, ModulesController, ItemsController],
  providers: [
    CoursesService,
    ModulesService,
    ItemsService,
    PrismaService,
    PrismaPostgresService,
  ],
})
export class AppModule {}
