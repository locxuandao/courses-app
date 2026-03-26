import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @Optional()
  avatarUrl?: string;

  @IsNumber()
  @ApiProperty()
  roleId: number;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updateAt: Date;
}

export class UpdateUserDto {
  @IsNumber()
  @ApiProperty()
  roleId: number;

  @IsDate()
  @ApiProperty()
  updateAt: Date;
}
