import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithGoogle(googleUser: any) {
    if (!googleUser || !googleUser.email) {
      throw new UnauthorizedException('Invalid Google user');
    }

    let user = await this.usersService.findUserbyEmail(googleUser.email);

    if (!user) {
      user = await this.usersService.create({
        email: googleUser.email,
        username: googleUser.username,
        avatarUrl: googleUser.avatarUrl,
        roleId: 2,
        createdAt: new Date(),
        updateAt: new Date(),
      });
    }

    const permissions = user.role?.permissions?.map((p) => p.name) || [];

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role?.name,
      permissions,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      }),
      user,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const decoded = this.jwtService.verify(dto.refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      const user = await this.usersService.findUserById(decoded.sub);
      const permissions = user.role?.permissions?.map((p) => p.name) || [];
      const payload = {
        email: user.email,
        sub: user.id,
        role: user.role,
        permissions,
      };
      return {
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: '7d',
        }),
        user,
      };
    } catch (error) {
      this.logger.error('Failed to refresh token', error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
