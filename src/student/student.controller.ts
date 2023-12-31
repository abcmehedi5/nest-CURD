import { UpdateStudentDto } from './../dto/update.stuend.dto';
import { StudentCreateDto } from 'src/dto/create.student.dto';
import { StudentService } from './student.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  //   create studnet
  @Post()
  async createStudent(
    @Res() response,
    @Body() studentCreateDto: StudentCreateDto,
  ) {
    try {
      const newStudent = this.studentService.createStudent(studentCreateDto);
      return response.status(HttpStatus.CREATED).json({
        statusCode: 200,
        message: 'student create has been succesfull',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error student not create ',
        error: 'Bad Request',
      });
    }
  }

  //   get all student
  @Get()
  async getAllStudent(@Res() response) {
  try {
    const studentData = await this.studentService.getAllStudents();
    return response.status(HttpStatus.OK).json({
      message: 'all student data found successfull',
      studentData,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error student not found ',
        error: 'Bad Request',
      });
  }
  }

  //update student data
  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') studnetId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
        const exestingStudent = await this.studentService.updateStudent(
            studnetId,
            updateStudentDto,
          );
          return response.status(HttpStatus.OK).json({
            message: 'Student update successfull successfull',
            exestingStudent,
          });
    } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: 400,
            message: 'error student update not found',
            error: 'Bad Request',
          });
    }
  }

  //student delete
  @Delete('/:id')
  async studentDelete(@Res() response, @Param('id') studentId: string) {
    try {
      const deleteStudent = await this.studentService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student delete  successfull',
        deleteStudent,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'error student not delete ',
        error: 'Bad Request',
      });
    }
  }
}
