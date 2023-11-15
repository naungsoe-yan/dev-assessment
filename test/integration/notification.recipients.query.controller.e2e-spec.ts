import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('NotificationRecipientsQueryController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/retrievefornotifications (POST)', async () => {
    const requestBody = {
      teacher: 'teacherken@gmail.com',
      notification:
        'Hello students! @studentjon@gmail.com @studenthon@gmail.com',
    };
    const responseBody = {
      recipients: ['studentjon@gmail.com'],
    };
    return await request(app.getHttpServer())
      .post('/api/retrievefornotifications')
      .send(requestBody)
      .expect(200)
      .expect(responseBody);
  });

  afterAll(async () => {
    await app.close();
  });
});
