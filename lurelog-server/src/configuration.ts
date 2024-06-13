import type { IMidwayContainer } from '@midwayjs/core';
import { App, Config, Configuration } from '@midwayjs/core';
import * as cos from '@midwayjs/cos';
import * as crossDomain from '@midwayjs/cross-domain';
import * as info from '@midwayjs/info';
import * as jwt from '@midwayjs/jwt';
import * as koa from '@midwayjs/koa';
import * as swagger from '@midwayjs/swagger';
import * as validate from '@midwayjs/validate';
import { PrismaClient } from '@prisma/client';
import { join } from 'node:path';
import { DefaultErrorFilter } from './filter/default.filter';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { ReportMiddleware } from './middleware/report.middleware';

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
