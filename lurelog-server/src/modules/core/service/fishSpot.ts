import { Inject, Provide } from '@midwayjs/core';
import type { FishSpot, PrismaClient } from '@prisma/client';
import { BaseService } from '../../../base/base_service';

@Provide()
export class FishSpotService extends BaseService<FishSpot> {
  @Inject('prisma')
  private prismaClient: PrismaClient;

  protected get model() {
    return this.prismaClient.fishSpot;
  }
}
