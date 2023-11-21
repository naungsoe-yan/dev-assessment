import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { arrayNotEmpty, isEmail, isEmpty } from 'class-validator';
import { isItemEmail } from '../../common/utils/array.util';
import { CommonStudentsRequestModel } from '../models/common.students.request.model';

@Injectable()
export class ParseCommonStudentsRequestPipe implements PipeTransform<string[]> {
  transform(value: string | string[]): CommonStudentsRequestModel {
    if (isEmpty(value)) {
      throw new BadRequestException('teacher should not be empty');
    }

    if (Array.isArray(value)) {
      if (!arrayNotEmpty(value)) {
        throw new BadRequestException('teacher should not be empty');
      } else if (!value.every(isItemEmail)) {
        throw new BadRequestException('each value in teacher must be an email');
      }
    } else if (!isEmail(value)) {
      throw new BadRequestException('teacher must be an email');
    }

    return {
      teachers: Array.isArray(value) ? value : [value],
    };
  }
}
