import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Auditable } from './auditable.entity';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';

@Entity('registrations')
export class Registration extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  constructor(teacher: Teacher, student: Student) {
    super();
    this.teacher = teacher;
    this.student = student;
  }
}
