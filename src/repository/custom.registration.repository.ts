import { DataSource } from 'typeorm';
import { Registration } from '../repository/entities/registration.entity';

export class CustomRegistrationRepository {
  constructor(private dataSource: DataSource) {}

  findByTeacherEmailAndSuspended(
    teacherEmail: string,
    studentSuspended: boolean,
  ): Promise<Registration[]> {
    return this.dataSource
      .getRepository(Registration)
      .createQueryBuilder('registrations')
      .innerJoinAndSelect('registrations.teacher', 'teacher')
      .innerJoinAndSelect('registrations.student', 'student')
      .where('teacher.email = :email', {
        email: teacherEmail,
      })
      .andWhere('student.suspended = :suspended', {
        suspended: studentSuspended,
      })
      .getMany();
  }

  findByTeachersEmail(teacherEmails: string[]): Promise<Registration[]> {
    return this.dataSource
      .getRepository(Registration)
      .createQueryBuilder('registrations')
      .innerJoinAndSelect('registrations.teacher', 'teacher')
      .innerJoinAndSelect('registrations.student', 'student')
      .where('teacher.email IN (:emails)', {
        emails: teacherEmails,
      })
      .getMany();
  }
}
