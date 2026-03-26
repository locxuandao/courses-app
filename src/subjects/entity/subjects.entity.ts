import { ApiProperty } from '@nestjs/swagger';
import { TABLES_NAME } from 'src/constants';
import { Documents } from 'src/documents/entity/documents.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(TABLES_NAME.SUBJECTS)
export class Subjects {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Documents, (document) => document.subject)
  documents: Documents[];

  @CreateDateColumn()
  createdAt: Date;
}
