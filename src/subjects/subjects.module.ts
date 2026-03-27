import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subjects } from './entity/subjects.entity';
import { SubjectsController } from './subjects.controller';
import { SubjectjsService } from './subjectjs.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subjects]), forwardRef(() => AuthModule)],
  controllers: [SubjectsController],
  providers: [SubjectjsService],
})
export class SubjectsModule {}
