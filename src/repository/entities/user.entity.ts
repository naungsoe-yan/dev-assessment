import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Auditable } from './auditable.entity';

export abstract class User extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  constructor(email: string) {
    super();
    this.email = email;
  }
}
