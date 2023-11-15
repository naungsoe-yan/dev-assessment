import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';

@Injectable()
export class RegistrationRepository extends Repository<Registration> {
  constructor(private dataSource: DataSource) {
    super(Registration, dataSource.createEntityManager());
  }

  async findByTeacherEmail(teacherEmail: string): Promise<Registration[]> {
    return await this.createQueryBuilder('registrations')
      .innerJoinAndSelect('registrations.teacher', 'teacher')
      .innerJoinAndSelect('registrations.student', 'student')
      .where('teacher.email = :teacherEmail', {
        teacherEmail: teacherEmail,
      })
      .getMany();
  }

  async findByTeacherEmailAndSuspended(
    teacherEmail: string,
    studentSuspended: boolean,
  ): Promise<Registration[]> {
    return await this.createQueryBuilder('registrations')
      .innerJoinAndSelect('registrations.teacher', 'teacher')
      .innerJoinAndSelect('registrations.student', 'student')
      .where('teacher.email = :teacherEmail', {
        teacherEmail: teacherEmail,
      })
      .andWhere('student.suspended = :suspended', {
        suspended: studentSuspended,
      })
      .getMany();
  }

  async findByTeachersEmail(teacherEmails: string[]): Promise<Registration[]> {
    return await this.createQueryBuilder('registrations')
      .innerJoinAndSelect('registrations.teacher', 'teacher')
      .innerJoinAndSelect('registrations.student', 'student')
      .where('teacher.email IN (:...teacherEmails)', {
        teacherEmails: teacherEmails,
      })
      .getMany();
  }
}
