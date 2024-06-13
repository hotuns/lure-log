import type { MidwayHttpError } from '@midwayjs/core';
import { Catch, Inject } from '@midwayjs/core';
import type { Context } from '@midwayjs/koa';
import type { LogService } from '../modules/core/service/log';

@Catch()
export class DefaultErrorFilter {
  @Inject()
  private log: LogService;

  async catch(error: MidwayHttpError, ctx: Context) {
    error.code = ctx?.request?.body as string;
    const errorLog = await this.log.error(
      ctx.state?.user?.id?.toString(),
      ctx.path,
      error
    );
    const { status = -1 } = error;
    const message = /[\u4E00-\u9FA5]/.test(error.message)
      ? error.message
      : '服务器开小差了';
    return { header: { status, message, requestId: errorLog.id } };
  }
}
