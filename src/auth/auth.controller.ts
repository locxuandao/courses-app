import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const email = req.user?.email;
    if (!email || !/^[^@]+@([a-zA-Z0-9_\-]+\.)*hou\.edu\.vn$/.test(email)) {
      return res.redirect(`${FRONTEND_URL}/login?error=unauthorized_email`);
    }

    const data = await this.authService.loginWithGoogle(req.user);

    const params = new URLSearchParams({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      user: JSON.stringify(data.user),
    });

    return res.redirect(`${FRONTEND_URL}/auth/callback?${params.toString()}`);
  }
}
