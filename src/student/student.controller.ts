import { StudentCreateDto } from 'src/dto/create.student.dto';
import { StudentService } from './student.service';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

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
    const studentData = await this.studentService.getAllStudents();
    return response.status(HttpStatus.OK).json({
      message: 'all student data found successfull',
      studentData,
    });
  }
}
