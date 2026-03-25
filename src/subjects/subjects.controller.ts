import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SubjectjsService } from './subjectjs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/auth/decorator/permission.decorator';
import { CreateSubjectDto } from './dto/subjects.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@ApiTags('Subjects Management')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectjsService) {}

  @Get('/')
  @Permissions('subject:read')
  findAll() {
    return this.subjectsService.findAll();
  }

  @Post('/')
  @Permissions('subject:create')
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.create(dto);
  }
}
