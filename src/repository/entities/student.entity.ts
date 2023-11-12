import { Entity, Column } from 'typeorm';
import { User } from './user.entity';

@Entity('students')
export class Student extends User {
  @Column()
  suspended: boolean;

  @Column({ name: 'suspended_date' })
  suspendedDate: Date;

  constructor(email: string) {
    super(email);
    this.suspended = false;
  }

  suspend() {
    this.suspended = true;
    this.suspendedDate = new Date();
    this.updatedDate = this.suspendedDate;
  }
}
