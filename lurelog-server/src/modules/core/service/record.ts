import { Inject, Provide } from '@midwayjs/core';
import type { PrismaClient, Record } from '@prisma/client';
import { BaseService } from '../../../base/base_service';

@Provide()
export class RecordService extends BaseService<Record> {
  @Inject('prisma')
  private prismaClient: PrismaClient;

  protected get model() {
    return this.prismaClient.record;
  }
}
