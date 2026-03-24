import { TABLES_NAME } from 'src/constants';
import { Permissions } from 'src/permissions/entity/permissions.entity';
import { Users } from 'src/users/entity/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(TABLES_NAME.ROLES)
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];

  @ManyToMany(() => Permissions)
  @JoinTable()
  permissions: Permissions[];
}
