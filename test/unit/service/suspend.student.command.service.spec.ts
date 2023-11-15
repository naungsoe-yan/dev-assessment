import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { SuspendStudentCommandService } from '../../../src/service/suspend.student.command.service';
import { SuspendStudentRequestModel } from '../../../src/service/models/suspend.student.request.model';
import { StudentRepository } from '../../../src/repository/student.repository';
import { Student } from '../../../src/repository/entities/student.entity';

describe('SuspendStudentCommandService', () => {
  let commandService: SuspendStudentCommandService;
  let studentRepository: StudentRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        SuspendStudentCommandService,
        StudentRepository,
        { provide: DataSource, useFactory: createMock<DataSource> },
      ],
    }).compile();

    commandService = await moduleRef.resolve(SuspendStudentCommandService);
    studentRepository = await moduleRef.resolve(StudentRepository);
  });

  describe('suspendStudent', () => {
    it('should suspend a specified student', async () => {
      const studentJon = new Student('studentjon@gmail.com');
      const requestModel = new SuspendStudentRequestModel(studentJon.email);
      jest
        .spyOn(studentRepository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(studentJon));
      jest.spyOn(studentRepository, 'save').mockImplementation();
      await commandService.suspendStudent(requestModel);
      expect(studentRepository.findOneBy).toHaveBeenCalled();
      expect(studentRepository.save).toHaveBeenCalled();
    });

    it('should not suspend a suspended student', async () => {
      const studentJon = new Student('studentjon@gmail.com');
      studentJon.suspend();
      const requestModel = new SuspendStudentRequestModel(studentJon.email);
      jest
        .spyOn(studentRepository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(studentJon));
      jest.spyOn(studentRepository, 'save').mockImplementation();
      await commandService.suspendStudent(requestModel);
      expect(studentRepository.findOneBy).toHaveBeenCalled();
      expect(studentRepository.save).not.toHaveBeenCalled();
    });
  });
});
