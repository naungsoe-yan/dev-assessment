import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }

  async findByEmails(emails: string[]) {
    return await this.createQueryBuilder('students')
      .where('email IN (:...emails)', {
        emails: emails,
      })
      .getMany();
  }

  async findByEmailsAndSuspended(emails: string[], suspended: boolean) {
    return await this.createQueryBuilder('students')
      .where('email IN (:...emails)', {
        emails: emails,
      })
      .andWhere('suspended = :suspended', {
        suspended: suspended,
      })
      .getMany();
  }
}
