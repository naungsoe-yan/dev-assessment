import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { DataSource } from 'typeorm';
import { RegisterStudentsCommandService } from '../../../src/service/register.students.command.service';
import { RegisterStudentsRequestModel } from '../../../src/service/models/register.students.request.model';
import { TeacherRepository } from '../../../src/repository/teacher.repository';
import { Teacher } from '../../../src/repository/entities/teacher.entity';
import { StudentRepository } from '../../../src/repository/student.repository';
import { Student } from '../../../src/repository/entities/student.entity';
import { RegistrationRepository } from '../../../src/repository/registration.repository';
import { Registration } from '../../../src/repository/entities/registration.entity';

describe('RegisterStudentsCommandService', () => {
  let commandService: RegisterStudentsCommandService;
  let teacherRepository: TeacherRepository;
  let studentRepository: StudentRepository;
  let registrationRepository: RegistrationRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterStudentsCommandService,
        TeacherRepository,
        StudentRepository,
        RegistrationRepository,
        { provide: DataSource, useFactory: createMock<DataSource> },
      ],
    }).compile();

    commandService = await moduleRef.resolve(RegisterStudentsCommandService);
    teacherRepository = await moduleRef.resolve(TeacherRepository);
    studentRepository = await moduleRef.resolve(StudentRepository);
    registrationRepository = await moduleRef.resolve(RegistrationRepository);
    dataSource = await moduleRef.resolve(DataSource);
  });

  describe('registerStudents', () => {
    it('should register new students to a specified teacher', async () => {
      const teackerKen = new Teacher('teacherken@gmail.com');
      const studentJon = new Student('studentjon@gmail.com');
      const studentHon = new Student('studenthon@gmail.com');
      const requestModel = new RegisterStudentsRequestModel(teackerKen.email, [
        studentJon.email,
        studentHon.email,
      ]);
      jest
        .spyOn(teacherRepository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(null));
      jest.spyOn(teacherRepository, 'save').mockImplementation();
      jest
        .spyOn(studentRepository, 'findByEmails')
        .mockImplementation(() => Promise.resolve([]));
      jest
        .spyOn(registrationRepository, 'findByTeacherEmail')
        .mockImplementation(() => Promise.resolve([]));
      await commandService.registerStudents(requestModel);
      expect(teacherRepository.findOneBy).toHaveBeenCalled();
      expect(teacherRepository.save).toHaveBeenCalled();
      expect(studentRepository.findByEmails).toHaveBeenCalled();
      expect(registrationRepository.findByTeacherEmail).toHaveBeenCalled();
      expect(dataSource.transaction).toHaveBeenCalledTimes(2);
    });

    it('should register existing students to a specified teacher', async () => {
      const teackerKen = new Teacher('teacherken@gmail.com');
      const studentJon = new Student('studentjon@gmail.com');
      const studentHon = new Student('studenthon@gmail.com');
      const requestModel = new RegisterStudentsRequestModel(teackerKen.email, [
        studentJon.email,
        studentHon.email,
      ]);
      jest
        .spyOn(teacherRepository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(teackerKen));
      jest.spyOn(teacherRepository, 'save').mockImplementation();
      jest
        .spyOn(studentRepository, 'findByEmails')
        .mockImplementation(() => Promise.resolve([studentJon, studentHon]));
      jest
        .spyOn(registrationRepository, 'findByTeacherEmail')
        .mockImplementation(() => Promise.resolve([]));
      await commandService.registerStudents(requestModel);
      expect(teacherRepository.findOneBy).toHaveBeenCalled();
      expect(teacherRepository.save).not.toHaveBeenCalled();
      expect(studentRepository.findByEmails).toHaveBeenCalled();
      expect(registrationRepository.findByTeacherEmail).toHaveBeenCalled();
      expect(dataSource.transaction).toHaveBeenCalledTimes(1);
    });

    it('should not register existing students to a specified teacher', async () => {
      const teackerKen = new Teacher('teacherken@gmail.com');
      const studentJon = new Student('studentjon@gmail.com');
      const studentHon = new Student('studenthon@gmail.com');
      const registrations = [
        new Registration(teackerKen, studentJon),
        new Registration(teackerKen, studentHon),
      ];
      const requestModel = new RegisterStudentsRequestModel(teackerKen.email, [
        studentJon.email,
        studentHon.email,
      ]);
      jest
        .spyOn(teacherRepository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(teackerKen));
      jest.spyOn(teacherRepository, 'save').mockImplementation();
      jest
        .spyOn(studentRepository, 'findByEmails')
        .mockImplementation(() => Promise.resolve([studentJon, studentHon]));
      jest
        .spyOn(registrationRepository, 'findByTeacherEmail')
        .mockImplementation(() => Promise.resolve(registrations));
      await commandService.registerStudents(requestModel);
      expect(teacherRepository.findOneBy).toHaveBeenCalled();
      expect(teacherRepository.save).not.toHaveBeenCalled();
      expect(studentRepository.findByEmails).toHaveBeenCalled();
      expect(registrationRepository.findByTeacherEmail).toHaveBeenCalled();
      expect(dataSource.transaction).toHaveBeenCalledTimes(0);
    });
  });
});
