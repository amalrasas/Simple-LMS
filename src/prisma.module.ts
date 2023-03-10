import { Module } from '@nestjs/common';

import { PrismaPostgresService } from 'src/prismapostgres.service';


import { PrismaService } from './prisma.service';


@Module({

  providers: [PrismaService, PrismaPostgresService],

  exports: [PrismaService, PrismaPostgresService],

})

export class PrismaModule {}