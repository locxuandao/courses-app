import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { CoursesModule } from './courses/courses.module';
import { Courses } from './courses/entity/courses.entity';
import { CoursesUsersModule } from './courses-users/courses-users.module';

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
        entities: [Users],
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
