import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { DocumentsService } from './documents.service';
import { Permissions } from 'src/auth/decorator/permission.decorator';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/documents.dto';

@Controller('documents')
@ApiTags('Documents Management')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiBearerAuth('access-token')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('/')
  @Permissions('document:read')
  findAll() {
    return this.documentsService.findAll();
  }

  @Get('/:id')
  @Permissions('document:read')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentsService.findOne(id);
  }

  @Get('/author/:authorId')
  @Permissions('document:read')
  findByAuthor(@Param('authorId') authorId: number) {
    return this.documentsService.findByAuthorId(authorId);
  }

  @Get('/subject/:subjectId')
  @Permissions('document:read')
  findBySubject(@Param('subjectId') subjectId: number) {
    return this.documentsService.findBySubjectId(subjectId);
  }

  @Patch('/:id')
  @Permissions('document:update')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, dto);
  }

  @Post('/')
  @Permissions('document:create')
  create(@Body() dto: CreateDocumentDto) {
    return this.documentsService.create(dto);
  }

  @Delete('/:id')
  @Permissions('document:delete')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.documentsService.remove(id);
  }
}
