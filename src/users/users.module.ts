import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { AtStrategy } from 'src/auth/at.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService,PrismaService,AtStrategy,ConfigService]
})
export class UsersModule {}
