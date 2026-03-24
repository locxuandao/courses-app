import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { CoursesModule } from './courses/courses.module';
import { CoursesUsersModule } from './courses-users/courses-users.module';
import { Roles } from './roles/entity/roles.entity';
import { Permissions } from './permissions/entity/permissions.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: [Users, Permissions, Roles],
        database: process.env.DB_NAME,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    CoursesUsersModule,
  ],
})
export class AppModule {}
