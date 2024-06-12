import { Inject, Provide } from '@midwayjs/core';
import { FishSpecies, PrismaClient } from '@prisma/client';
import { BaseService } from '../../../base/base_service';

@Provide()
export class FishSpeciesService extends BaseService<FishSpecies> {
  @Inject('prisma')
  private prismaClient: PrismaClient;

  protected get model() {
    return this.prismaClient.fishSpecies;
  }
}
