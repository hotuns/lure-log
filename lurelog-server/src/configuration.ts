import { Configuration, App, IMidwayContainer, Config } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { DefaultErrorFilter } from './filter/default.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as jwt from '@midwayjs/jwt';
import * as swagger from '@midwayjs/swagger';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { PrismaClient } from '@prisma/client';
import * as crossDomain from '@midwayjs/cross-domain';
import * as cos from '@midwayjs/cos';

@Configuration({
  imports: [
    koa,
    validate,
    jwt,
    crossDomain,
    swagger,
    cos,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  @Config('prisma')
  private prismaConfig;

  async onReady(container: IMidwayContainer) {
    this.registerPrisma(container);
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtMiddleware]);
    // add filter
    this.app.useFilter([DefaultErrorFilter]);
  }
  async onStop(container: IMidwayContainer): Promise<void> {
    const prisma = await container.getAsync<PrismaClient>('prisma');
    prisma.$disconnect();
  }

  private registerPrisma(container: IMidwayContainer) {
    const prisma = new PrismaClient({
      // log: [{ emit: 'event', level: 'query' }],
      datasources: { db: { url: this.prismaConfig.url } },
    });
    prisma.$connect();
    // prisma.$on('query', (event) => {
    // console.log(event);
    // });
    container.registerObject('prisma', prisma);
  }
}
