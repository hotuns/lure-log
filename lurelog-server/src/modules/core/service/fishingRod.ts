import { Inject, Provide } from '@midwayjs/core';
import { FishingRod, PrismaClient } from '@prisma/client';
import { BaseService } from '../../../base/base_service';

@Provide()
export class FishingRodService extends BaseService<FishingRod> {
  @Inject('prisma')
  private prismaClient: PrismaClient;

  protected get model() {
    return this.prismaClient.fishingRod;
  }
}
