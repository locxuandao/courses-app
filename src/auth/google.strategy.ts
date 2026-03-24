import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || 'default',
      clientSecret:
        configService.get<string>('GOOGLE_CLIENT_SECRET') || 'default',
      callbackURL:
        configService.get<string>('GOOGLE_CALLBACK_URL') ||
        '/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('Google profile:', profile);
    const email = profile?.emails?.[0]?.value;
    const avatarUrl = profile?.photos?.[0]?.value || profile?.picture || '';
    const username = profile?.displayName || profile?.name?.givenName || email;

    if (!email) {
      throw new Error('No email from Google');
    }

    return {
      email,
      username,
      avatarUrl,
    };
  }
}
