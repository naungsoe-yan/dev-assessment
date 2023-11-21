import { Injectable, Logger } from '@nestjs/common';
import { arrayNotEmpty } from 'class-validator';
import { ExtendedNotificationRecipientsRequestModel } from './models/extended.notification.recipients.request.model';
import { NotificationRecipientsResponseModel } from './models/notification.recipients.response.model';
import { StudentRepository } from '../repository/student.repository';
import { RegistrationRepository } from '../repository/registration.repository';

@Injectable()
export class NotificationRecipientsQueryService {
  private readonly logger = new Logger(NotificationRecipientsQueryService.name);

  constructor(
    private studentRepository: StudentRepository,
    private registrationRepository: RegistrationRepository,
  ) {}

  async findNotificationRecipientsBy(
    requestModel: ExtendedNotificationRecipientsRequestModel,
  ): Promise<NotificationRecipientsResponseModel> {
    const registeredRecipients = await this.findRegisteredRecipients(
      requestModel.teacher,
    );

    if (!arrayNotEmpty(requestModel.recipients)) {
      const responseModel = new NotificationRecipientsResponseModel(
        registeredRecipients,
      );
      return Promise.resolve(responseModel);
    }

    const unregisteredRecipients = requestModel.recipients.filter(
      (recipient) => !registeredRecipients.includes(recipient),
    );
    const students = await this.studentRepository.findByEmailsAndSuspended(
      unregisteredRecipients,
      false,
    );
    let eligibleRecipients = students.map((student) => student.email);
    eligibleRecipients = eligibleRecipients.concat(registeredRecipients).sort();
    const responseModel = new NotificationRecipientsResponseModel(
      eligibleRecipients,
    );
    return Promise.resolve(responseModel);
  }

  private async findRegisteredRecipients(
    teacherEmail: string,
  ): Promise<string[]> {
    const registrations =
      await this.registrationRepository.findByTeacherEmailAndSuspended(
        teacherEmail,
        false,
      );
    return registrations.map((registration) => registration.student.email);
  }
}
