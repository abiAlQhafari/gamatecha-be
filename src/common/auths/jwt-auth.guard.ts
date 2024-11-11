import { ExecutionContext, Injectable } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '../exception/types/unauthorized.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);
    if (!canActivate) {
      throw new UnauthorizedException();
    }
    return true;
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException(
        'expiredCredential',
        'Your credentials have expired.',
      );
    } else if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(
        'invalidCredential',
        'Your credentials is invalid.',
      );
    } else if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
