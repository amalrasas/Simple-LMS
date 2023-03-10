import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from './types/jwtPayload.type';
import { JwtPayloadWithRt } from './types/jwtPayloadWithRt.type';

@Injectable()
/*export class JwtStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      secretOrKey: 'rt-secret',
      passReqToCallback:true,
    });
  }*/
  export class RtStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'rt-secret',
        passReqToCallback: true,
      });
    }
  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refresh_token = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!refresh_token) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refresh_token,
    }
  }
}
 /* private static extractJWT(req: Request): string | null {
    return req?.cookies?.token ?? null;
  }

  async validate(payload: { id: string; email: string },req:Request) {
    const refreshToken=req.get('authorization').replace('Bearer','').trim()
    return {
      ...payload,refreshToken
    }
  }
}*/
