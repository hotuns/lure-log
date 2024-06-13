import type { IMiddleware } from '@midwayjs/core';
import { Inject, Middleware } from '@midwayjs/core';
import type { Context, NextFunction } from '@midwayjs/koa';
import type { ReportService } from '../modules/core/service/report';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  private report: ReportService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 控制器前执行的逻辑
      const startTime = Date.now();
      const { path, querystring, method, headers, request } = ctx;
      const ip = (headers['x-real-ip'] ||
        headers['x-forwarded-for'] ||
        ctx.ip) as string;
      // 执行下一个 Web 中间件，最后执行到控制器
      // 这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();
      const responseTime = Date.now() - startTime;
      // 控制器之后执行的逻辑
      ctx.logger.info(
        `Report in "src/middleware/report.middleware.ts", rt = ${responseTime}ms`
      );
      const report = await this.report.create({
        ip: ip.replace(/::ffff:/, ''),
        method,
        path,
        query: querystring,
        body: JSON.stringify(request.body),
        response: method !== 'GET' ? JSON.stringify(ctx.body) : '',
        responseTime,
      });
      Object.assign((ctx.body as { header; content })?.header || {}, {
        requestId: report.id,
      });

      // 返回给上一个中间件的结果
      return result;
    };
  }

  static getName(): string {
    return 'report';
  }
}
