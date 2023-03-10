import { Controller, Get, Post, Body, Req, Res, UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

import { GetCurrentUserId } from 'src/decorators/get-current-user-id.decorator';
import { Tokens } from './types/tokens.type';
import { AtGuard } from 'src/guards/at.guard';
import { RtGuard } from 'src/guards/rt.guard';
import { Public } from 'src/decorators/public.decorator';
import { getCurrentUser } from 'src/decorators/get-current-user-rt.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  signUp(@Body() authDto:AuthDto){
    return this.authService.signUp(authDto)

  }
  @Public()
  @Post('signin')
  signIn(@Body() authDto:AuthDto,):Promise<Tokens>{
    return this.authService.signIn(authDto)
    
  }
  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  refreshTokens(@GetCurrentUserId() userId:number,@getCurrentUser('refresh_token') refreshToken: string){
    console.log(userId)
    console.log(refreshToken)
    return this.authService.refreshTokens(userId,refreshToken);
    
    //return this.authService.refreshTokens(parseInt(this.request.params.id),this.request.params.hashedRt)
  }

  
  @Get('signout')
  signOut(@GetCurrentUserId() userId:number){
    //console.log(userId)
    return this.authService.signOut(userId)
   
  }
}
