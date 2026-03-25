import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subjects } from './entity/subjects.entity';
import { SubjectsController } from './subjects.controller';
import { SubjectjsService } from './subjectjs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subjects])],
  controllers: [SubjectsController],
  providers: [SubjectjsService],
})
export class SubjectsModule {}
