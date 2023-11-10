import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEmail, isEmpty } from 'class-validator';
import { CommonStudentsRequestModel } from '../../services/models/common.students.request.model';

@Injectable()
export class ParseCommonStudentsRequestPipe implements PipeTransform<string[]> {
  private readonly regex = new RegExp(/@([~\S]*)/, 'g');
  private readonly isItemEmail = (item: string) => isEmail(item, {});

  transform(value: string[]): CommonStudentsRequestModel {
    if (isEmpty(value)) {
      throw new BadRequestException(`teacher should not be empty`);
    }

    if (!value.every(this.isItemEmail)) {
      throw new BadRequestException(`each value in teacher must be an email`);
    }

    return {
      teachers: value,
    };
  }
}
