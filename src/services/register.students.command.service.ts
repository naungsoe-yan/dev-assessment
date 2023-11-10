import { Injectable, Logger } from '@nestjs/common';
import { RegisterStudentsRequestModel } from './models/register.students.request.model';

@Injectable()
export class RegisterStudentsCommandService {
  private readonly logger = new Logger(RegisterStudentsCommandService.name);

  registerStudents(requestModel: RegisterStudentsRequestModel) {
    this.logger.log(JSON.stringify(requestModel));
  }
}
