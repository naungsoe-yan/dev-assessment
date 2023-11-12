import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { isEmpty } from 'class-validator';
import { isItemInArray } from '../common/utils/array.util';
import { CustomRegistrationRepository } from '../repository/custom.registration.repository';
import { Registration } from '../repository/entities/registration.entity';
import { CommonStudentsRequestModel } from './models/common.students.request.model';
import { CommonStudentsResponseModel } from './models/common.students.response.model';

@Injectable()
export class CommonStudentsQueryService {
  private readonly logger = new Logger(CommonStudentsQueryService.name);
  private customRegistrationRepository: CustomRegistrationRepository;

  constructor(private dataSource: DataSource) {
    this.customRegistrationRepository = new CustomRegistrationRepository(
      dataSource,
    );
  }

  async findCommonStrudents(
    requestModel: CommonStudentsRequestModel,
  ): Promise<CommonStudentsResponseModel> {
    const registrations =
      await this.customRegistrationRepository.findByTeachersEmail(
        requestModel.teachers,
      );
    const uniqueStudentEmailsMap =
      this.findUniqueStudentEmailsMap(registrations);
    const commonStudentEmails: string[] = [];
    uniqueStudentEmailsMap.forEach((teacherEmails, uniqueStudentEmail) => {
      if (requestModel.teachers.every(isItemInArray(teacherEmails))) {
        commonStudentEmails.push(uniqueStudentEmail);
      }
    });
    const responseModel = new CommonStudentsResponseModel(commonStudentEmails);
    return Promise.resolve(responseModel);
  }

  private findUniqueStudentEmailsMap(
    registrations: Registration[],
  ): Map<string, string[]> {
    const uniqueStudentsMap = new Map<string, string[]>();
    registrations.forEach((registration) => {
      const teacherEmail = registration.teacher.email;
      const studentEmail = registration.student.email;
      const element = uniqueStudentsMap.get(studentEmail);

      if (isEmpty(element)) {
        uniqueStudentsMap.set(studentEmail, [teacherEmail]);
      } else {
        element.push(teacherEmail);
      }
    });
    return uniqueStudentsMap;
  }
}
