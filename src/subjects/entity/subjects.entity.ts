import { ApiProperty } from '@nestjs/swagger';
import { TABLES_NAME } from 'src/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(TABLES_NAME.SUBJECTS)
export class Subjects {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;
}
