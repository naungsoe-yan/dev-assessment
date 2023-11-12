import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { Student } from '../repository/entities/student.entity';
import { SuspendStudentRequestModel } from './models/suspend.student.request.model';

@Injectable()
export class SuspendStudentCommandService {
  private readonly logger = new Logger(SuspendStudentCommandService.name);

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async suspendStudent(requestModel: SuspendStudentRequestModel) {
    const student = await this.studentRepository.findOneBy({
      email: requestModel.student,
    });

    if (isEmpty(student)) {
      throw new BadRequestException('student must be registered first');
    } else if (!student.suspended) {
      student.suspend();
      this.studentRepository.save(student);
    }
  }
}
