import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as User;
  }
);
