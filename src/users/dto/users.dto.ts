import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from 'src/constants';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsDate()
  @ApiProperty()
  dob: Date;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @ApiProperty({ default: ROLE.USER })
  @IsString()
  role: ROLE;
}

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsDate()
  @ApiProperty()
  @IsOptional()
  dob?: Date;

  @ApiProperty()
  @IsString()
  role: ROLE;
}
