import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isApprove?: boolean = false;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  attachments?: any;

  @ApiProperty()
  @IsNumber()
  authorId: number;

  @ApiProperty()
  @IsNumber()
  subjectId: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updateAt: Date;
}

export class UpdateDocumentDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isApprove?: boolean = false;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  attachments?: any;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  subjectId?: number;

  @ApiProperty()
  @IsDate()
  updateAt: Date;
}
