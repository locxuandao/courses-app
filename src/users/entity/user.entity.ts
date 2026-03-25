import { TABLES_NAME } from 'src/constants';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/roles/entity/roles.entity';

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

  @ApiProperty()
  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles;
}
