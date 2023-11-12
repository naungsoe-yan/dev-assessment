import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, In } from 'typeorm';
import { isNotEmpty } from 'class-validator';
import { Teacher } from '../repository/entities/teacher.entity';
import { Student } from '../repository/entities/student.entity';
import { Registration } from '../repository/entities/registration.entity';
import { RegisterStudentsRequestModel } from './models/register.students.request.model';

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
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
  ) {}

  async registerStudents(
    requestModel: RegisterStudentsRequestModel,
  ): Promise<void> {
    const teacher = await this.findOrSaveTeacher(requestModel.teacher);
    const students = await this.findOrSaveStudents(requestModel.students);
    const registrations = await this.registrationRepository.find({
      where: { teacher: teacher },
      relations: { teacher: true, student: true },
    });
    const newStudents = students.filter(
      (student) => !registrations.some(this.isExistingRegistration(student)),
    );
    const newRegistrations = newStudents.map((newStudent) => {
      const newRegistration = new Registration(teacher, newStudent);
      newRegistration.createdDate = new Date();
      return newRegistration;
    });
    this.dataSource.transaction(async (manager) => {
      newRegistrations.forEach(async (newRegistration) => {
        manager.save(newRegistration);
      });
    });
  }

  private async findOrSaveTeacher(teacherEmail: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOneBy({
      email: teacherEmail,
    });

    if (isNotEmpty(teacher)) {
      return Promise.resolve(teacher);
    }

    const newTeacher = new Teacher(teacherEmail);
    newTeacher.createdDate = new Date();
    return this.teacherRepository.save(newTeacher);
  }

  private async findOrSaveStudents(
    studentEmails: string[],
  ): Promise<Array<Student>> {
    const students = await this.studentRepository.findBy({
      email: In(studentEmails),
    });

    if (students.length === studentEmails.length) {
      return Promise.resolve(students);
    }

    const newStudentEmails = studentEmails.filter(
      (email) => !students.some(this.isExistingStudent(email)),
    );
    let newStudents = newStudentEmails.map((newEmail) => {
      const newStudent = new Student(newEmail);
      newStudent.createdDate = new Date();
      return newStudent;
    });
    newStudents = await this.studentRepository.save(newStudents);
    return Promise.resolve(students.concat(newStudents));
  }
}
