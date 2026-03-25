import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SubjectjsService } from './subjectjs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from 'src/auth/permissions.guard';
import { Permissions } from 'src/auth/decorator/permission.decorator';
import { CreateSubjectDto } from './dto/subjects.dto';

@ApiTags('Subjects Management')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
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
