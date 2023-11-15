import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { SuspendStudentCommandController } from '../../../src/controller/suspend.student.command.controller';
import { SuspendStudentRequestModel } from '../../../src/service/models/suspend.student.request.model';
import { SuspendStudentCommandService } from '../../../src/service/suspend.student.command.service';
import { StudentRepository } from '../../../src/repository/student.repository';

describe('SuspendStudentCommandController', () => {
  let queryController: SuspendStudentCommandController;
  let queryService: SuspendStudentCommandService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [SuspendStudentCommandController],
      providers: [
        SuspendStudentCommandService,
        StudentRepository,
        { provide: DataSource, useFactory: createMock<DataSource> },
      ],
    }).compile();

    queryController = await moduleRef.resolve(SuspendStudentCommandController);
    queryService = await moduleRef.resolve(SuspendStudentCommandService);
  });

  describe('suspendStudent', () => {
    it('should suspend a specified student', async () => {
      const requestModel = new SuspendStudentRequestModel(
        'studenthon@gmail.com',
      );
      jest
        .spyOn(queryService, 'suspendStudent')
        .mockImplementation(() => Promise.resolve());
      await queryController.suspendStudent(requestModel);
      expect(queryService.suspendStudent).toHaveBeenCalled();
    });
  });
});
