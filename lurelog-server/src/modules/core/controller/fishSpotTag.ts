import { Inject } from '@midwayjs/core';
import { BaseController } from '../../../base/base_controller';
import { Crud } from '../../../decorator/crud';
import type { FishSpotTagService } from '../service/fishSpotTag';

@Crud(
  '/fishspottag',
  { description: '钓点标签' },
  {
    apis: ['index', 'show', 'create', 'update', 'destroy'],
  }
)
export class FishSpotTagController extends BaseController {
  @Inject()
  protected service: FishSpotTagService;
}
