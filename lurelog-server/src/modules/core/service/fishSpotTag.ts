import { Inject, Provide } from '@midwayjs/core';
import type { FishSpotTag, PrismaClient } from '@prisma/client';
import { BaseService } from '../../../base/base_service';

@Provide()
export class FishSpotTagService extends BaseService<FishSpotTag> {
  @Inject('prisma')
  private prismaClient: PrismaClient;

  protected get model() {
    return this.prismaClient.fishSpotTag;
  }
}
