import { ApiProperty } from '@nestjs/swagger';
import { TABLES_NAME } from 'src/constants';
import { Subjects } from 'src/subjects/entity/subjects.entity';
import { Users } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(TABLES_NAME.DOCUMENTS)
export class Documents {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  content: string;

  @Column({ default: false })
  @ApiProperty()
  isApprove: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @CreateDateColumn()
  @ApiProperty()
  updateAt: Date;

  @ApiProperty()
  @ManyToOne(() => Subjects, (subject) => subject.documents)
  subject: Subjects;

  @ApiProperty()
  @ManyToOne(() => Users, (user) => user.documents)
  author: Users;
}
