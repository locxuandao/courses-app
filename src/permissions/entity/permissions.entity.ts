import { TABLES_NAME } from 'src/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(TABLES_NAME.PERMISSIONS)
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
