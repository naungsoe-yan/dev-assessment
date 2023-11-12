import { Column } from 'typeorm';

export abstract class Auditable {
  @Column({ name: 'created_date' })
  createdDate: Date;

  @Column({ name: 'updated_date' })
  updatedDate: Date;
}
