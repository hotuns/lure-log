import { MidwayConfig } from '@midwayjs/core';
import { renderJSON } from '@midwayjs/swagger';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1717337220224_6833',
  jwt: {
    secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
    sign: {
      expiresIn: '2d',
    },
    verify: {},
    decode: {},
    whitelist: ['/home', '/swagger-ui', '/auth/login', '/auth/register'],
  },
  swagger: {
    swaggerUIRender: renderJSON,
  },
  cos: {
    client: {
      SecretId: '***********',
      SecretKey: '***********',
    },
  },
  cors: {
    origin: '*',
  },
  prisma: {
    url: 'mysql://root:rootpassword@localhost:3306/lure_db',
  },
  koa: {
    port: 7001,
  },
} as MidwayConfig;
