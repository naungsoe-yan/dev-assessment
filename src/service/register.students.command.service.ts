import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { arrayNotEmpty, isNotEmpty } from 'class-validator';
import { RegisterStudentsRequestModel } from './models/register.students.request.model';
import { TeacherRepository } from '../repository/teacher.repository';
import { Teacher } from '../repository/entities/teacher.entity';
import { StudentRepository } from '../repository/student.repository';
import { Student } from '../repository/entities/student.entity';
import { RegistrationRepository } from '../repository/registration.repository';
import { Registration } from '../repository/entities/registration.entity';

@Injectable()
export class RegisterStudentsCommandService {
  private readonly logger = new Logger(RegisterStudentsCommandService.name);
  private readonly isExistingStudent = (email: string) => (student: Student) =>
    student.email === email;
  private readonly isExistingRegistration =
    (student: Student) => (registration: Registration) =>
      registration.student.email === student.email;

  constructor(
    private dataSource: DataSource,
    private teacherRepository: TeacherRepository,
    private studentRepository: StudentRepository,
    private registrationRepository: RegistrationRepository,
  ) {}

  async registerStudents(
    requestModel: RegisterStudentsRequestModel,
  ): Promise<void> {
    const teacher = await this.findOrSaveTeacher(requestModel.teacher);
    const students = await this.findOrSaveStudents(requestModel.students);
    const registrations = await this.registrationRepository.findByTeacherEmail(
      requestModel.teacher,
    );
    const newStudents = students.filter(
      (student) => !registrations.some(this.isExistingRegistration(student)),
    );
    const newRegistrations = newStudents.map((newStudent) => {
      const newRegistration = new Registration(teacher, newStudent);
      newRegistration.createdDate = new Date();
      return newRegistration;
    });

    if (arrayNotEmpty(newRegistrations)) {
      await this.dataSource.transaction(async (manager) => {
        newRegistrations.forEach(async (newRegistration) => {
          manager.save(newRegistration);
        });
      });
      this.logger.log(
        `Created registration {${JSON.stringify(newRegistrations)}}`,
      );
    }
  }

  private async findOrSaveTeacher(teacherEmail: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOneBy({
      email: teacherEmail,
    });

    if (isNotEmpty(teacher)) {
      return Promise.resolve(teacher);
    }

    let newTeacher = new Teacher(teacherEmail);
    newTeacher.createdDate = new Date();
    newTeacher = await this.teacherRepository.save(newTeacher);
    this.logger.log(`Created a teacher {${JSON.stringify(newTeacher)}}`);
  }

  private async findOrSaveStudents(
    studentEmails: string[],
  ): Promise<Array<Student>> {
    console.log('studentEmails', studentEmails);
    const students = await this.studentRepository.findByEmails(studentEmails);

    if (students.length === studentEmails.length) {
      return Promise.resolve(students);
    }

    const newStudentEmails = studentEmails.filter(
      (email) => !students.some(this.isExistingStudent(email)),
    );
    const newStudents = newStudentEmails.map((newEmail) => {
      const newStudent = new Student(newEmail);
      newStudent.createdDate = new Date();
      return newStudent;
    });
    await this.dataSource.transaction(async (manager) => {
      newStudents.map(async (newStudent) => {
        return manager.save(newStudent);
      });
    });
    this.logger.log(`Created students {${JSON.stringify(newStudents)}}`);
    return Promise.resolve(students.concat(newStudents));
  }
}
