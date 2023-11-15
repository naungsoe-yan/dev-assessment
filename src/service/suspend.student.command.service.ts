import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { SuspendStudentRequestModel } from './models/suspend.student.request.model';
import { StudentRepository } from '../repository/student.repository';

@Injectable()
export class SuspendStudentCommandService {
  private readonly logger = new Logger(SuspendStudentCommandService.name);

  constructor(private studentRepository: StudentRepository) {}

  async suspendStudent(
    requestModel: SuspendStudentRequestModel,
  ): Promise<void> {
    const student = await this.studentRepository.findOneBy({
      email: requestModel.student,
    });

    if (isEmpty(student)) {
      throw new BadRequestException('student must be registered');
    } else if (!student.suspended) {
      student.suspend();
      await this.studentRepository.save(student);
      this.logger.log(`Suspended a student {${JSON.stringify(student)}}`);
    }
  }
}
