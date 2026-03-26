import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { Roles } from './roles/entity/roles.entity';
import { Permissions } from './permissions/entity/permissions.entity';
import { SubjectsModule } from './subjects/subjects.module';
import { DocumentsModule } from './documents/document.module';

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
    SubjectsModule,
    DocumentsModule,
  ],
})
export class AppModule {}
