import { ROLE, TABLES_NAME } from 'src/constants';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Courses } from 'src/courses/entity/courses.entity';

@Entity(TABLES_NAME.USERS)
export class Users {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @Column()
  dob: Date;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.USER,
  })
  role: ROLE;

  @OneToMany(() => Courses, (course) => course.author)
  courses: Courses[];
}
