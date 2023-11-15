import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { CommonStudentsQueryController } from '../../../src/controller/common.students.query.controller';
import { CommonStudentsQueryService } from '../../../src/service/common.students.query.service';
import { CommonStudentsRequestModel } from '../../../src/service/models/common.students.request.model';
import { CommonStudentsResponseModel } from '../../../src/service/models/common.students.response.model';
import { RegistrationRepository } from '../../../src/repository/registration.repository';

describe('CommonStudentsQueryController', () => {
  let queryController: CommonStudentsQueryController;
  let queryService: CommonStudentsQueryService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CommonStudentsQueryController],
      providers: [
        CommonStudentsQueryService,
        RegistrationRepository,
        { provide: DataSource, useFactory: createMock<DataSource> },
      ],
    }).compile();

    queryController = await moduleRef.resolve(CommonStudentsQueryController);
    queryService = await moduleRef.resolve(CommonStudentsQueryService);
  });

  describe('findCommonStrudentsBy', () => {
    it('should return students common to a given list of teachers', async () => {
      const requestModel = new CommonStudentsRequestModel([
        'teacherken@gmail.com',
      ]);
      const responseModel = new CommonStudentsResponseModel([
        'studentjon@gmail.com',
        'studenthon@gmail.com',
      ]);
      jest
        .spyOn(queryService, 'findCommonStrudentsBy')
        .mockImplementation(() => Promise.resolve(responseModel));
      const result = await queryController.findCommonStrudentsBy(requestModel);
      expect(queryService.findCommonStrudentsBy).toHaveBeenCalled();
      expect(result).toBe(responseModel);
    });
  });
});
