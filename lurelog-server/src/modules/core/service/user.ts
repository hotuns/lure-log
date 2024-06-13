import { Inject, Provide } from '@midwayjs/core';
import type { PrismaClient, User } from '@prisma/client';
import type { JwtService } from '@midwayjs/jwt';
import { BaseService } from '../../../base/base_service';
import type { Crypto } from '../../../util/crypto';

@Provide()
export class UserService extends BaseService<User> {
  @Inject()
  private crypto: Crypto;

  @Inject()
  private jwtService: JwtService;

  @Inject('prisma')
  private prismaClient: PrismaClient;

  protected get model() {
    return this.prismaClient.user;
  }

  public async registerUser(data: {
    username: string;
    phone: string;
    password: string;
  }) {
    const { phone, username, password } = data;
    if (!phone && !username) {
      throw new Error('用户名和手机号不能同时为空');
    }
    const existModel = await this.model.count({
      where: { OR: [{ phone }, { username }] },
    });
    if (existModel) {
      throw new Error('用户已存在');
    }
    const encryptPassword = this.crypto.md5(password);

    const model = await this.model.create({
      data: {
        username: username || phone,
        password: encryptPassword,
        role: 'User',
        phone,
      },
    });

    // 创建用户后，创建用户的背包
    await this.prismaClient.backpack.create({
      data: {
        userId: model.id,
      },
    });

    return Object.assign(model, { password: null });
  }

  public async create(data: User) {
    const { phone, username, password } = data;
    if (!phone && !username) {
      throw new Error('用户名和手机号不能同时为空');
    }
    const existModel = await this.model.count({
      where: { OR: [{ phone }, { username }] },
    });
    if (existModel) {
      throw new Error('用户已存在');
    }
    const encryptPassword = this.crypto.encrypt(password);
    Object.assign(data, {
      username: username || phone,
      password: encryptPassword,
    });
    const model = await this.model.create({ data });

    // 创建用户后，创建用户的背包
    await this.prismaClient.backpack.create({
      data: {
        userId: model.id,
      },
    });

    return Object.assign(model, { password: null });
  }

  public async login(body) {
    const { method = 'password', phone, username, password } = body;
    let model: User;
    const encryptPassword = this.crypto.md5(password);
    switch (method) {
      case 'password':
        model = await this.model.findFirst({
          where: {
            OR: [
              { phone, password: encryptPassword },
              { username, password: encryptPassword },
            ],
          },
        });
        break;
    }
    if (!model) {
      throw new Error('登录错误');
    }
    return this.jwtService.signSync({
      id: model.id,
      phone: model.phone,
      username: model.username,
      role: model.role,
    });
  }
}
