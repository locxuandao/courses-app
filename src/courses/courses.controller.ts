import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCourseDto, UpdateCourseDto } from './dto/courses.dto';
import { PaginationDto } from '../constants/dto/pagination.dto';

@ApiTags('Admin/Instructor - Courses Management')
@ApiBearerAuth('access-token')
@Controller({ path: 'courses' })
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all courses (paginated)' })
  findAll(@Query() pagination: PaginationDto) {
    return this.coursesService.findAll(pagination);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create course' })
  create(@Body() dto: CreateCourseDto, @Req() req: any) {
    return this.coursesService.create(dto, req.user.id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a course by ID' })
  delete(@Param('id') courseId: number, @Req() req: any) {
    return this.coursesService.delete(courseId, req.user);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a course by ID' })
  update(
    @Param('id') courseId: number,
    @Body() dto: UpdateCourseDto,
    @Req() req: any,
  ) {
    return this.coursesService.update(courseId, dto, req.user);
  }

  @Get('/author/:id')
  @ApiOperation({ summary: 'Get courses by author ID (paginated)' })
  findByAuthor(
    @Param('id') authorId: number,
    @Query() pagination: PaginationDto,
  ) {
    return this.coursesService.getByAuthorId(authorId, pagination);
  }
}
