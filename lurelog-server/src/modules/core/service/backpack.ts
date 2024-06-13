import { Inject, Provide } from '@midwayjs/core';
import type { Backpack, PrismaClient } from '@prisma/client';
import { BaseService } from '../../../base/base_service';

@Provide()
export class BackpackService extends BaseService<Backpack> {
  @Inject('prisma')
  private prismaClient: PrismaClient;

  protected get model() {
    return this.prismaClient.backpack;
  }

  async findOneByUserId(userId: number) {
    return this.model.findUnique({
      where: {
        userId,
      },
      include: {
        fishingRods: true,
        fishingReels: true,
      },
    });
  }
}
