import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CoursesUsersService } from './courses-users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PaginationDto } from '../constants/dto/pagination.dto';

@ApiTags('Courses Enrollment')
@Controller({ path: 'courses-users' })
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class CoursesUsersController {
  constructor(private readonly coursesUsersService: CoursesUsersService) {}

  @Post('/enroll/:courseId')
  @ApiOperation({ summary: 'Enroll current user in a course' })
  enroll(@Param('courseId', ParseIntPipe) courseId: number, @Req() req: any) {
    return this.coursesUsersService.enroll(req.user.id, courseId);
  }

  @Delete('/unenroll/:courseId')
  @ApiOperation({ summary: 'Unenroll current user from a course' })
  unenroll(@Param('courseId', ParseIntPipe) courseId: number, @Req() req: any) {
    return this.coursesUsersService.unenroll(req.user.id, courseId);
  }

  @Get('/my-courses')
  @ApiOperation({ summary: 'Get enrolled courses of current user (paginated)' })
  getEnrolledCourses(@Req() req: any, @Query() pagination: PaginationDto) {
    return this.coursesUsersService.getEnrolledCourses(req.user.id, pagination);
  }
}
