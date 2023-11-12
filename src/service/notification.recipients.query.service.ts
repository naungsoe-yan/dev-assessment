import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, In } from 'typeorm';
import { isEmpty } from 'class-validator';
import { CustomRegistrationRepository } from '../repository/custom.registration.repository';
import { Student } from '../repository/entities/student.entity';
import { NotificationRecipientsRequestModel } from './models/notification.recipients.request.model';
import { NotificationRecipientsResponseModel } from './models/notification.recipients.response.model';

@Injectable()
export class NotificationRecipientsQueryService {
  private readonly logger = new Logger(NotificationRecipientsQueryService.name);
  private customRegistrationRepository: CustomRegistrationRepository;

  constructor(
    private dataSource: DataSource,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {
    this.customRegistrationRepository = new CustomRegistrationRepository(
      dataSource,
    );
  }

  async findNotificationRecipients(
    requestModel: NotificationRecipientsRequestModel,
  ): Promise<NotificationRecipientsResponseModel> {
    const registeredRecipients = await this.findRegisteredRecipients(
      requestModel.teacher,
    );

    if (isEmpty(requestModel.recipients)) {
      return new NotificationRecipientsResponseModel(registeredRecipients);
    }

    const unregisteredRecipients = requestModel.recipients.filter(
      (recipient) => !registeredRecipients.includes(recipient),
    );
    const students = await this.studentRepository.findBy({
      email: In(unregisteredRecipients),
      suspended: false,
    });
    let eligibleRecipients = students.map((student) => student.email);
    eligibleRecipients = eligibleRecipients.concat(registeredRecipients);
    return new NotificationRecipientsResponseModel(eligibleRecipients);
  }

  private async findRegisteredRecipients(
    teacherEmail: string,
  ): Promise<string[]> {
    const registrations =
      await this.customRegistrationRepository.findByTeacherEmailAndSuspended(
        teacherEmail,
        false,
      );
    return registrations.map((registration) => registration.student.email);
  }
}
