import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { CommonStudentsQueryService } from '../../../src/service/common.students.query.service';
import { CommonStudentsRequestModel } from '../../../src/service/models/common.students.request.model';
import { CommonStudentsResponseModel } from '../../../src/service/models/common.students.response.model';
import { Teacher } from '../../../src/repository/entities/teacher.entity';
import { Student } from '../../../src/repository/entities/student.entity';
import { RegistrationRepository } from '../../../src/repository/registration.repository';
import { Registration } from '../../../src/repository/entities/registration.entity';

describe('CommonStudentsQueryService', () => {
  let queryService: CommonStudentsQueryService;
  let registrationRepository: RegistrationRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CommonStudentsQueryService,
        RegistrationRepository,
        { provide: DataSource, useFactory: createMock<DataSource> },
      ],
    }).compile();

    queryService = await moduleRef.resolve(CommonStudentsQueryService);
    registrationRepository = await moduleRef.resolve(RegistrationRepository);
  });

  describe('findCommonStrudentsBy', () => {
    it('should return students common to a specified teacher', async () => {
      const teackerKen = new Teacher('teacherken@gmail.com');
      const studentJon = new Student('studentjon@gmail.com');
      const studentHon = new Student('studenthon@gmail.com');
      const registrations = [
        new Registration(teackerKen, studentJon),
        new Registration(teackerKen, studentHon),
      ];
      const requestModel = new CommonStudentsRequestModel([teackerKen.email]);
      const responseModel = new CommonStudentsResponseModel([
        studentJon.email,
        studentHon.email,
      ]);
      jest
        .spyOn(registrationRepository, 'findByTeachersEmail')
        .mockImplementation(() => Promise.resolve(registrations));
      const result = await queryService.findCommonStrudentsBy(requestModel);
      expect(registrationRepository.findByTeachersEmail).toHaveBeenCalled();
      expect(result).toStrictEqual(responseModel);
    });

    it('should return students common to a given list of teachers', async () => {
      const teackerKen = new Teacher('teacherken@gmail.com');
      const teackerPeter = new Teacher('teacherpeter@gmail.com');
      const studentJon = new Student('studentjon@gmail.com');
      const studentHon = new Student('studenthon@gmail.com');
      const registrations = [
        new Registration(teackerKen, studentJon),
        new Registration(teackerKen, studentHon),
        new Registration(teackerPeter, studentJon),
      ];
      const requestModel = new CommonStudentsRequestModel([
        teackerKen.email,
        teackerPeter.email,
      ]);
      const responseModel = new CommonStudentsResponseModel([studentJon.email]);
      jest
        .spyOn(registrationRepository, 'findByTeachersEmail')
        .mockImplementation(() => Promise.resolve(registrations));
      const result = await queryService.findCommonStrudentsBy(requestModel);
      expect(registrationRepository.findByTeachersEmail).toHaveBeenCalled();
      expect(result).toStrictEqual(responseModel);
    });
  });
});
