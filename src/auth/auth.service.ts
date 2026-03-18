import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserbyEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
  }

  async register(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      const user = await this.usersService.create({
        ...dto,
        password: hashedPassword,
      });
      this.logger.log(`User registered with email: ${user.email}`);
      return user;
    } catch (error) {
      this.logger.error('Failed to register user', error.stack);
      throw new UnauthorizedException('Failed to register user');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      this.logger.warn(`Invalid login attempt for email: ${dto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };

    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
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
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: '7d',
        }),
      };
    } catch (error) {
      this.logger.error('Failed to refresh token', error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
