import { Inject } from '@midwayjs/core';
import { BaseController } from '../../../base/base_controller';
import { Crud } from '../../../decorator/crud';
import type { RecordService } from '../service/record';

@Crud(
  '/record',
  { description: '钓鱼记录' },
  {
    apis: ['index', 'show', 'create', 'update', 'destroy'],
  }
)
export class RecordController extends BaseController {
  @Inject()
  protected service: RecordService;
}
