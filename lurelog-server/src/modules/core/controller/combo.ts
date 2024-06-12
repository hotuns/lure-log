import { Inject } from '@midwayjs/core';
import { BaseController } from '../../../base/base_controller';
import { Crud } from '../../../decorator/crud';
import { ComboService } from '../service/combo';

@Crud(
  '/combo',
  { description: '组合管理' },
  {
    apis: ['index', 'show', 'create', 'update', 'destroy'],
  }
)
export class ComboController extends BaseController {
  @Inject()
  protected service: ComboService;
}
