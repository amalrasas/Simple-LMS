import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { Prisma, PrismaClient } from '@internal/prisma-postgres/client';


@Injectable()

export class PrismaPostgresService

  extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>

  implements OnModuleInit, OnModuleDestroy {



  async onModuleInit() {

    await this.$connect();


    this.$on('error', (_e) => {

      // Do something

    });


  }


  async onModuleDestroy() {

    await this.$disconnect();

  }

}