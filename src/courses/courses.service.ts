import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courses } from './entity/courses.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto, UpdateCourseDto } from './dto/courses.dto';
import { UsersService } from 'src/users/users.service';
import {
  PaginatedResult,
  PaginationDto,
} from '../constants/dto/pagination.dto';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);

  constructor(
    @InjectRepository(Courses)
    private coursesRepository: Repository<Courses>,
    private usersService: UsersService,
  ) {}

  async findAll(pagination: PaginationDto): Promise<PaginatedResult<Courses>> {
    try {
      const { page = 1, limit = 10 } = pagination;
      const skip = (page - 1) * limit;

      const [data, total] = await this.coursesRepository.findAndCount({
        skip,
        take: limit,
      });

      this.logger.log(`Retrieved ${data.length} courses (page ${page})`);

      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      this.logger.error('Failed to retrieve courses', error.stack);
      throw new BadRequestException('Failed to retrieve courses');
    }
  }

  async create(dto: CreateCourseDto, author_id: number): Promise<Courses> {
    try {
      const author = await this.usersService.findUserById(author_id);

      const course = this.coursesRepository.create({
        ...dto,
        author,
      });

      const savedCourse = await this.coursesRepository.save(course);
      this.logger.log(`Course created with ID: ${savedCourse.id}`);

      return savedCourse;
    } catch (error) {
      this.logger.error('Failed to create course', error.stack);
      throw new BadRequestException('Failed to create course');
    }
  }

  async delete(
    courseId: number,
    user: { id: number; role: string },
  ): Promise<void> {
    try {
      const course = await this.coursesRepository.findOne({
        where: { id: courseId },
        relations: ['author'],
      });

      if (!course) {
        throw new BadRequestException('Course not found');
      }

      if (
        user.role === 'admin' ||
        (user.role === 'instructor' && course.author.id === user.id)
      ) {
        await this.coursesRepository.delete(courseId);
        this.logger.log(`Course deleted with ID: ${courseId}`);
      } else {
        throw new BadRequestException(
          'You do not have permission to delete this course',
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      this.logger.error(
        `Failed to delete course with ID: ${courseId}`,
        error.stack,
      );
      throw new BadRequestException('Failed to delete course');
    }
  }

  async update(
    courseId: number,
    dto: UpdateCourseDto,
    user: { id: number; role: string },
  ): Promise<Courses> {
    try {
      const course = await this.coursesRepository.findOne({
        where: { id: courseId },
        relations: ['author'],
      });

      if (!course) {
        throw new BadRequestException('Course not found');
      }

      if (
        user.role === 'admin' ||
        (user.role === 'instructor' && course.author.id === user.id)
      ) {
        await this.coursesRepository.update(courseId, { ...dto });
        this.logger.log(`Course updated with ID: ${courseId}`);
      } else {
        throw new BadRequestException(
          'You do not have permission to update this course',
        );
      }

      return course;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      this.logger.error(
        `Failed to update course with ID: ${courseId}`,
        error.stack,
      );
      throw new BadRequestException('Failed to update course');
    }
  }

  async getByAuthorId(
    authorId: number,
    pagination: PaginationDto,
  ): Promise<PaginatedResult<Courses>> {
    try {
      const { page = 1, limit = 10 } = pagination;
      const skip = (page - 1) * limit;

      const [data, total] = await this.coursesRepository.findAndCount({
        where: { author: { id: authorId } },
        skip,
        take: limit,
      });

      this.logger.log(
        `Retrieved ${data.length} courses for author ID: ${authorId} (page ${page})`,
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
    } catch (error) {
      this.logger.error(
        `Failed to retrieve courses for author ID: ${authorId}`,
        error.stack,
      );
      throw new BadRequestException('Failed to retrieve courses for author');
    }
  }
}
