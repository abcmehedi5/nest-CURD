import { UpdateStudentDto } from './../dto/update.stuend.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentCreateDto } from 'src/dto/create.student.dto';
import { IStudent } from 'src/interface/student.interface';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}

  // creating a new student in mongodb
  async createStudent(createStudentDto: StudentCreateDto): Promise<IStudent> {
    const newStudent = await new this.studentModel(createStudentDto);
    return newStudent.save(); // save a new studnet
  }

  //   find all student
  async getAllStudents(): Promise<IStudent[]> {
    const studnetData = await this.studentModel.find();
    if (!studnetData || studnetData.length == 0) {
      throw new NotFoundException('student data not found');
    }
    return studnetData;
  }

  //  get specific student by using id

  async getStudent(studentId: string): Promise<IStudent> {
    const existingStudent = await this.studentModel.findById(studentId);
    if (!existingStudent) {
      throw new NotFoundException('sutendt not found');
    }
    return existingStudent;
  }

  //   delete student

  async deleteStudent(studentId: string): Promise<IStudent> {
    const deleteStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deleteStudent) {
      throw new NotFoundException('student delete not found');
    }

    return deleteStudent;
  }

  // updaet student

  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const exestingStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      updateStudentDto,
      { new: true },
    );

    if (!exestingStudent) {
      throw new NotFoundException('studnet update not found ');
    }
    return exestingStudent;
  }
}
