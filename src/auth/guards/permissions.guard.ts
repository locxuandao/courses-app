import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorator/permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('No user in request — check JwtStrategy');
    }

    const permissions: string[] =
      user?.role?.permissions?.map((p: { name: string }) => p.name) ?? [];

    if (permissions.includes('*')) {
      return true;
    }

    const hasPermission = requiredPermissions.some((perm) =>
      permissions.includes(perm),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `Required: [${requiredPermissions.join(', ')}] — user has: [${permissions.join(', ')}]`,
      );
    }

    return true;
  }
}
