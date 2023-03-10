import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import {JwtModule} from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport';
import { RtStrategy } from './rt.strategy';

@Module({
  imports:[JwtModule,PassportModule,],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,RtStrategy,]
})
export class AuthModule {}
