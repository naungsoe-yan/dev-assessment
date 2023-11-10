import { Injectable, Logger } from '@nestjs/common';
import { SuspendStudentRequestModel } from './models/suspend.student.request.model';

@Injectable()
export class SuspendStudentCommandService {
  private readonly logger = new Logger(SuspendStudentCommandService.name);

  suspendStudent(requestModel: SuspendStudentRequestModel) {
    this.logger.log(JSON.stringify(requestModel));
  }
}
