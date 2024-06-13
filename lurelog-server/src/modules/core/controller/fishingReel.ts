import { Inject } from '@midwayjs/core';
import { BaseController } from '../../../base/base_controller';
import { Crud } from '../../../decorator/crud';
import type { FishingReelService } from '../service/fishingReel';

@Crud(
  '/fishingreel',
  { description: '卷线器' },
  {
    apis: ['index', 'show', 'create', 'update', 'destroy'],
  }
)
export class FishingReelController extends BaseController {
  @Inject()
  protected service: FishingReelService;
}
