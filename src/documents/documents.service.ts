import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documents } from './entity/documents.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/documents.dto';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);
  constructor(
    @InjectRepository(Documents)
    private documentsRepository: Repository<Documents>,
  ) {}

  async create(dto: CreateDocumentDto) {
    try {
      const document = this.documentsRepository.create({
        ...dto,
        author: { id: dto.authorId },
        subject: { id: dto.subjectId },
      });
      const result = await this.documentsRepository.save(document);
      this.logger.log(`Document created with id: ${result.id}`);

      const documentWithRelations = await this.documentsRepository.findOne({
        where: { id: result.id },
        relations: ['author', 'subject'],
      });

      return documentWithRelations;
    } catch (error) {
      this.logger.error('Failed to create document', error.stack);
      throw new Error('Failed to create document');
    }
  }

  async findAll(): Promise<Documents[]> {
    try {
      const documents = await this.documentsRepository.find({
        relations: ['author', 'subject'],
      });
      this.logger.log(`Found ${documents.length} documents`);

      return documents;
    } catch (error) {
      this.logger.error('Failed to find documents', error.stack);
      throw new Error('Failed to find documents');
    }
  }

  async findOne(id: number): Promise<Documents> {
    try {
      const document = await this.documentsRepository.findOne({
        where: { id },
        relations: ['author', 'subject'],
      });
      if (!document) {
        this.logger.warn(`Document with id: ${id} not found`);
        throw new NotFoundException(`Document with id ${id} not found`);
      }
      this.logger.log(`Document with id: ${id} found`);

      return document;
    } catch (error) {
      this.logger.error(`Failed to find document with id: ${id}`, error.stack);
      throw new Error('Failed to find document');
    }
  }

  async findByAuthorId(authorId: number): Promise<Documents[]> {
    try {
      const documents = await this.documentsRepository.find({
        where: { author: { id: authorId } },
        relations: ['author', 'subject'],
      });
      this.logger.log(
        `Found ${documents.length} documents for author with id: ${authorId}`,
      );

      return documents;
    } catch (error) {
      this.logger.error(
        `Failed to find documents for author with id: ${authorId}`,
        error.stack,
      );
      throw new Error('Failed to find documents');
    }
  }

  async findBySubjectId(subjectId: number): Promise<Documents[]> {
    try {
      const documents = await this.documentsRepository.find({
        where: { subject: { id: subjectId }, isApprove: true },
        relations: ['author', 'subject'],
      });
      this.logger.log(
        `Found ${documents.length} documents for subject with id: ${subjectId}`,
      );
      return documents;
    } catch (error) {
      this.logger.error(
        `Failed to find documents for subject with id: ${subjectId}`,
        error.stack,
      );
      throw new Error('Failed to find documents');
    }
  }

  async update(id: number, dto: UpdateDocumentDto): Promise<Documents> {
    try {
      const document = await this.documentsRepository.findOne({
        where: { id },
      });
      if (!document) {
        this.logger.warn(`Document with id: ${id} not found`);
        throw new NotFoundException(`Document with id ${id} not found`);
      }

      const updatedDocument = this.documentsRepository.merge(document, dto);

      const result = await this.documentsRepository.save(updatedDocument);
      this.logger.log(`Document with id: ${id} updated successfully`);

      return result;
    } catch (error) {
      this.logger.error(
        `Failed to update document with id: ${id}`,
        error.stack,
      );
      throw new Error('Failed to update document');
    }
  }

  async remove(id: number) {
    try {
      const document = await this.documentsRepository.findOne({
        where: { id },
      });
      if (!document) {
        this.logger.warn(`Document with id: ${id} not found`);
        throw new NotFoundException(`Document with id ${id} not found`);
      }
      await this.documentsRepository.remove(document);
      this.logger.log(`Document with id: ${id} removed successfully`);

      return document;
    } catch (error) {
      this.logger.error(
        `Failed to remove document with id: ${id}`,
        error.stack,
      );
      throw new Error('Failed to remove document');
    }
  }
}
