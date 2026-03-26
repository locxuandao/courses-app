import { TABLES_NAME } from 'src/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/roles/entity/roles.entity';
import { Documents } from 'src/documents/entity/documents.entity';

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

  @Column({ nullable: true })
  @ApiProperty()
  avatarUrl: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @CreateDateColumn()
  @ApiProperty()
  updateAt: Date;

  @ApiProperty()
  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles;

  @ApiProperty()
  @OneToMany(() => Documents, (document) => document.author)
  documents: Documents[];
}
