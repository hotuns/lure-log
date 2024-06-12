import { Inject } from '@midwayjs/core';
import { BaseController } from '../../../base/base_controller';
import { Crud } from '../../../decorator/crud';
import { FishSpeciesService } from '../service/fishSpecies';

@Crud(
  '/fishspecies',
  { description: '鱼类图鉴' },
  {
    apis: ['index', 'show', 'create', 'update', 'destroy'],
  }
)
export class FishSpeciesController extends BaseController {
  @Inject()
  protected service: FishSpeciesService;
}
