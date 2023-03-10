import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';
import { Tokens } from './types/tokens.type';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signUp(authDto: AuthDto) {
    const { email, password } = authDto;
    const foundUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    return  { message: 'User created succefully' };

    
  }
  async signIn(authDto: AuthDto):Promise<Tokens>{
    const { email, password } = authDto;
    const foundUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }
    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });
    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }
    const tokens = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });
    if (!tokens) {
      throw new ForbiddenException();
    }
    await this.updateRtHash(foundUser.id, tokens.refresh_token);
    return tokens;

  }
  async signOut(userId: number){
     await this.prismaService.user.updateMany({
    where: {
      id: userId,
      hashedRt: {
        not: null,
      },
    },
    data: {
      hashedRt: null,
    },
  });
  return true
  }

  
  async refreshTokens(userId:number, rt:string) {
    const user= await this.prismaService.user.findUnique({
      where:{
        id:userId
      }
    })
    if(!user){
      throw new ForbiddenException('Access Denied')
    }
    console.log(rt)
    const rtMatches= await bcrypt.compare(rt,user.hashedRt)
    if(!rtMatches){
      throw new ForbiddenException('Access Denied')
    }
    const tokens = await this.signToken({
      id: user.id,
      email: user.email,
    });
   
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;

  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }
  async comparePasswords(args: { password: string; hash: string }) {
    //If it terturns true that means that the password the user provided is correct
    return await bcrypt.compare(args.password, args.hash);
  }

  //this method generates a JWT
  async signToken(args: { id: number; email: string }) {
    //payload is what i want to include in the token
    const payload = args;
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'at-secret',
        expiresIn: 60 * 15, //15 mins
      }),
      this.jwtService.signAsync(payload, {
        secret: 'rt-secret',
        expiresIn: 60 * 60 * 24 * 7, //1 week
      }),
    ]);

    return { access_token: at, refresh_token: rt };
  }
  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashPassword(rt);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { hashedRt: rt },
    });
  }
   /*async signIn(authDto: AuthDto, req: Request, res: Response) {
    const { email, password } = authDto;
    const foundUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }
    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });
    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }
    //the code below generates a jwt
    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });
    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token); //sets a ccookie & the cookie will be included in the response header of HTTP response
    // first argument is the name of the cookie, second is the value of the cookie
    return res.send({ message: 'Logged in successfully' });
  }*/
 /* async signOut(req: Request, res: Response) {
    //we have to clear the cookie here
    res.clearCookie('token');
    return res.send({ message: 'Logged out successfully' });
  }*/
}
