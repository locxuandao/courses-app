import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Users } from 'src/users/entity/user.entity';
import { Courses } from 'src/courses/entity/courses.entity';
import { TABLES_NAME } from 'src/constants';

@Entity(TABLES_NAME.COURSES_USERS)
@Unique(['user', 'course'])
export class CourseUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Courses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Courses;
}
