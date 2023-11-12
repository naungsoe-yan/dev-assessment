import { Entity } from 'typeorm';
import { User } from './user.entity';

@Entity('teachers')
export class Teacher extends User {
  constructor(email: string) {
    super(email);
  }
}
