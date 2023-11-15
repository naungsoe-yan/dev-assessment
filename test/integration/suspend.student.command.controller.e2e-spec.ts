import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('SuspendStudentCommandController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/suspend (POST)', async () => {
    const requestBody = {
      student: 'studenthon@gmail.com',
    };
    return await request(app.getHttpServer())
      .post('/api/suspend')
      .send(requestBody)
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
