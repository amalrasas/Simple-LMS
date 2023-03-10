import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types/jwtPayload.type';
/*export const GetCurrentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): number => {
      const request = context.switchToHttp().getRequest();
      const user = request.user as JwtPayload;
      return user.sub;
    },
  );*/
export const GetCurrentUserId = createParamDecorator(
  (data:string, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
  //  console.log(data)
    if(!user){
        return null
    }
   
    return data ? user[data].id : user.id;
  },
);
/*export const GetCurrentUserId = createParamDecorator(
    (data:string,ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      
     return request.user.id
    },
  );*/