import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { RegisterStudentsCommandController } from '../../../src/controller/register.students.command.controller';
import { RegisterStudentsCommandService } from '../../../src/service/register.students.command.service';
import { RegisterStudentsRequestModel } from '../../../src/service/models/register.students.request.model';
import { TeacherRepository } from '../../../src/repository/teacher.repository';
import { StudentRepository } from '../../../src/repository/student.repository';
import { RegistrationRepository } from '../../../src/repository/registration.repository';

describe('RegisterStudentsCommandController', () => {
  let queryController: RegisterStudentsCommandController;
  let queryService: RegisterStudentsCommandService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RegisterStudentsCommandController],
      providers: [
        RegisterStudentsCommandService,
        TeacherRepository,
        StudentRepository,
        RegistrationRepository,
        { provide: DataSource, useFactory: createMock<DataSource> },
      ],
    }).compile();

    queryController = await moduleRef.resolve(
      RegisterStudentsCommandController,
    );
    queryService = await moduleRef.resolve(RegisterStudentsCommandService);
  });

  describe('registerStudents', () => {
    it('should register students to a specified teacher', async () => {
      const requestModel = new RegisterStudentsRequestModel(
        'studenthon@gmail.com',
        ['studentjon@gmail.com', 'studenthon@gmail.com'],
      );
      jest
        .spyOn(queryService, 'registerStudents')
        .mockImplementation(() => Promise.resolve());
      await queryController.registerStudents(requestModel);
      expect(queryService.registerStudents).toHaveBeenCalled();
    });
  });
});
