import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courses } from './entity/courses.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Courses]), AuthModule, UsersModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [TypeOrmModule],
})
export class CoursesModule {}
