import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Subjects } from './entity/subjects.entity';
import { CreateSubjectDto } from './dto/subjects.dto';

@Injectable()
export class SubjectjsService {
  private readonly logger = new Logger(SubjectjsService.name);
  constructor(
    @InjectRepository(Subjects)
    private subjectsRepository: Repository<Subjects>,
  ) {}

  async findAll() {
    try {
      const subjects = await this.subjectsRepository.find();
      this.logger.log(`Found ${subjects.length} subjects`);
      return subjects;
    } catch (error) {
      this.logger.error('Failed to find subjects', error.stack);
      throw new Error('Failed to find subjects');
    }
  }

  async create(dto: CreateSubjectDto) {
    try {
      const subject = this.subjectsRepository.create(dto);
      const result = await this.subjectsRepository.save(subject);
      this.logger.log(`Subject created with id: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error('Failed to create subject', error.stack);
      throw new Error('Failed to create subject');
    }
  }
}
