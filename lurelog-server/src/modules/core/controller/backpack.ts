import { Inject } from '@midwayjs/core';
import { BaseController } from '../../../base/base_controller';
import { Crud } from '../../../decorator/crud';
import type { BackpackService } from '../service/backpack';

@Crud(
  '/backpack',
  { description: '背包管理' },
  {
    apis: ['show', 'create', 'update'],
  }
)
export class UserController extends BaseController {
  @Inject()
  protected service: BackpackService;
}
