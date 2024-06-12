import { Inject } from '@midwayjs/core';
import { BaseController } from '../../../base/base_controller';
import { Crud } from '../../../decorator/crud';
import { FishingRodService } from '../service/fishingRod';

@Crud(
  '/fishingrod',
  { description: '鱼竿' },
  {
    apis: ['index', 'show', 'create', 'update', 'destroy'],
  }
)
export class FishingRodController extends BaseController {
  @Inject()
  protected service: FishingRodService;
}
