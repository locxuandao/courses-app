import { ApiProperty } from '@nestjs/swagger';
import { TABLES_NAME } from 'src/constants';
import { Users } from 'src/users/entity/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';

@Entity(TABLES_NAME.COURSES)
export class Courses {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @ManyToOne(() => Users, (user) => user.courses)
  @JoinColumn({ name: 'author_id' })
  author: Users;
}
