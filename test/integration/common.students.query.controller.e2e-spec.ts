import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('CommonStudentsQueryController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/commonstudents (GET)', async () => {
    const responseBody = {
      students: ['studentjon@gmail.com', 'studenthon@gmail.com'],
    };
    return await request(app.getHttpServer())
      .get('/api/commonstudents?teacher=teacherken%40gmail.com')
      .expect(200)
      .expect(responseBody);
  });

  afterAll(async () => {
    await app.close();
  });
});
