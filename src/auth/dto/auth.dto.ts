import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @Length(1, 1000)
  refreshToken: string;
}
