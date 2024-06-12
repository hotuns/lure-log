import { Inject, Provide } from '@midwayjs/core';
import { FishingReel, PrismaClient } from '@prisma/client';
import { BaseService } from '../../../base/base_service';

@Provide()
export class FishingReelService extends BaseService<FishingReel> {
  @Inject('prisma')
  private prismaClient: PrismaClient;

  protected get model() {
    return this.prismaClient.fishingReel;
  }
}
