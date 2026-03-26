import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documents } from './entity/documents.entity';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Module({
  imports: [TypeOrmModule.forFeature([Documents])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
