import { Controller, Get, Query } from '@nestjs/common';
import { ParseCommonStudentsRequestPipe } from './pipes/common.students.request.pipe';
import { CommonStudentsRequestModel } from '../services/models/common.students.request.model';
import { CommonStudentsResponseModel } from '../services/models/common.students.response.model';
import { CommonStudentsQueryService } from '../services/common.students.query.service';

@Controller('api')
export class CommonStudentsQueryController {
  constructor(private readonly queryService: CommonStudentsQueryService) {}

  @Get('commonstudents')
  findCommonStrudents(
    @Query('teacher', ParseCommonStudentsRequestPipe)
    requestModel: CommonStudentsRequestModel,
  ): CommonStudentsResponseModel {
    return this.queryService.findCommonStrudents(requestModel);
  }
}
