import { Catch, Inject, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { LogService } from '../modules/core/service/log';

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
    const message = /[\u4e00-\u9fa5]/.test(error.message)
      ? error.message
      : '服务器开小差了';
    return { header: { status, message, requestId: errorLog.id } };
  }
}
