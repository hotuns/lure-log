import { Inject, Provide } from '@midwayjs/core';
import type { Combo, PrismaClient } from '@prisma/client';
import { BaseService } from '../../../base/base_service';

@Provide()
export class ComboService extends BaseService<Combo> {
  @Inject('prisma')
  private prismaClient: PrismaClient;

  protected get model() {
    return this.prismaClient.combo;
  }
}
