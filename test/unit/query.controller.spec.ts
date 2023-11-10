import { Test, TestingModule } from '@nestjs/testing';
import { QueryController } from '../../src/controllers/notification.recipients.query.controller';
import { QueryService } from '../../src/services/notification.recipients.query.service';

describe('AppController', () => {
  let appController: QueryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QueryController],
      providers: [QueryService],
    }).compile();

    appController = app.get<QueryController>(QueryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getCommonStudents()).toBe('Hello World!');
    });
  });
});
