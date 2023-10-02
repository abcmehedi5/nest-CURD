import { PartialType } from '@nestjs/mapped-types';
import { StudentCreateDto } from './create.student.dto';

export class UpdateStudentDto extends PartialType(StudentCreateDto) {}
