import { Module } from '@nestjs/common';
import { CoursesUsersService } from './courses-users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseUser } from './entity/courses-users.entity';
import { CoursesModule } from '../courses/courses.module';
import { CoursesUsersController } from './courses-users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseUser]), CoursesModule, AuthModule],
  controllers: [CoursesUsersController],
  providers: [CoursesUsersService],
})
export class CoursesUsersModule {}
