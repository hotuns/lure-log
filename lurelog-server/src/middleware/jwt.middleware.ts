import { Inject, Middleware, httpError, Config } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { PathToRegexp } from '../util/path_to_regexp';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  @Inject()
  private pathToRegexp: PathToRegexp;

  @Config('jwt.whitelist')
  private whitelist: string[];

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError('没有token，请重新登录');
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          const user = await this.jwtService.verify(token);
          ctx.state.user = user;
        } catch (error) {
          // //token过期 生成新的token
          // const newToken = getToken(user);
          // //将新token放入Authorization中返回给前端
          // ctx.set('Authorization', newToken);

          throw new httpError.UnauthorizedError(
            'token过期，请重新登录' + error?.message
          );
        }
        await next();
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const { path, header } = ctx;
    const ignore = this.pathToRegexp.pathMatch(this.whitelist, path, false);

    return !ignore;
  }
}
