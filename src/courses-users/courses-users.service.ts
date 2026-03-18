import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseUser } from './entity/courses-users.entity';
import { Repository } from 'typeorm';
import { Courses } from 'src/courses/entity/courses.entity';
import {
  PaginatedResult,
  PaginationDto,
} from '../constants/dto/pagination.dto';

@Injectable()
export class CoursesUsersService {
  private readonly logger = new Logger(CoursesUsersService.name);

  constructor(
    @InjectRepository(CourseUser)
    private coursesUsersRepository: Repository<CourseUser>,
    @InjectRepository(Courses)
    private courseRepo: Repository<Courses>,
  ) {}

  async enroll(userId: number, courseId: number): Promise<CourseUser> {
    if (!userId) {
      this.logger.warn(
        `Attempt to enroll with missing userId for course ID: ${courseId}`,
      );
      throw new BadRequestException('User id is required');
    }
    const course = await this.courseRepo.findOne({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const existed = await this.coursesUsersRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (existed) {
      throw new BadRequestException('Already enrolled');
    }

    const enrollment = this.coursesUsersRepository.create({
      user: { id: userId },
      course: { id: courseId },
    });

    this.logger.log(`Enrolling user ID ${userId} in course ID ${courseId}`);

    return await this.coursesUsersRepository.save(enrollment);
  }

  async getEnrolledCourses(
    userId: number,
    pagination: PaginationDto,
  ): Promise<PaginatedResult<CourseUser>> {
    if (!userId) {
      this.logger.warn('Attempt to get enrolled courses with missing userId');
      throw new BadRequestException('User id is required');
    }
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await this.coursesUsersRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['course'],
      skip,
      take: limit,
    });

    this.logger.log(
      `Retrieved ${data.length} enrollments for user ID ${userId} (page ${page})`,
    );

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async unenroll(userId: number, courseId: number): Promise<void> {
    if (!userId) {
      this.logger.warn(
        `Attempt to unenroll with missing userId for course ID: ${courseId}`,
      );
      throw new BadRequestException('User id is required');
    }
    const enrollment = await this.coursesUsersRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    enrollment.user = null as any;
    await this.coursesUsersRepository.save(enrollment);
    this.logger.log(
      `User ID ${userId} disassociated from enrollment ID ${enrollment.id} for course ID ${courseId}`,
    );
  }
}
