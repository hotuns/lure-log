import { Inject } from '@midwayjs/core';
import { BaseController } from '../../../base/base_controller';
import { Crud } from '../../../decorator/crud';
import { UserDto } from '../dto/user';
import type { UserService } from '../service/user';

@Crud(
  '/user',
  { description: '用户管理' },
  {
    apis: ['index', 'show', 'create', 'update', 'destroy'],
    dto: { create: UserDto, update: UserDto },
  }
)
export class UserController extends BaseController {
  @Inject()
  protected service: UserService;
}
