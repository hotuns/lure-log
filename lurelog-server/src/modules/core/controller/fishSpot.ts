import { Inject } from '@midwayjs/core';
import { BaseController } from '../../../base/base_controller';
import { Crud } from '../../../decorator/crud';
import type { FishSpotService } from '../service/fishSpot';

@Crud(
  '/fishspot',
  { description: '钓点' },
  {
    apis: ['index', 'show', 'create', 'update', 'destroy'],
  }
)
export class fishSpotController extends BaseController {
  @Inject()
  protected service: FishSpotService;
}
