import { Injectable, Logger } from '@nestjs/common';
import { CommonStudentsRequestModel } from './models/common.students.request.model';
import { CommonStudentsResponseModel } from './models/common.students.response.model';

@Injectable()
export class CommonStudentsQueryService {
  private readonly logger = new Logger(CommonStudentsQueryService.name);

  findCommonStrudents(
    recipients: CommonStudentsRequestModel,
  ): CommonStudentsResponseModel {
    return { students: recipients.teachers };
  }
}
