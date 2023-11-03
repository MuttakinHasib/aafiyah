import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class Logout implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (request.isAuthenticated()) {
      await request.session.destroy(() => null);
      await request.logout(() => null);
      await response.clearCookie('connect.sid');
    }
    return true;
  }
}
