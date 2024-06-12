import { Controller, Get } from '@midwayjs/core';
import { BaseController } from '../base/base_controller';

@Controller('/home', { description: 'home' })
export class HomeController extends BaseController {
  @Get('/', { description: '首页' })
  public async index() {
    return this.success('Hello Midwayjs!');
  }
}
