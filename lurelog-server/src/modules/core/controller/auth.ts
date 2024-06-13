import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import type { JwtService } from '@midwayjs/jwt';
import { ApiBody } from '@midwayjs/swagger';
import type { PrismaClient } from '@prisma/client';
import { BaseController } from '../../../base/base_controller';
import { LoginDto, RegisterDto } from '../dto/auth';
import type { BackpackService } from '../service/backpack';
import type { UserService } from '../service/user';

@Controller('/auth', { description: '授权管理' })
export class AuthController extends BaseController {
  @Inject()
  private jwtService: JwtService;

  @Inject()
  private userService: UserService;

  @Inject()
  private backpackService: BackpackService;

  @Inject('prisma')
  private prismaClient: PrismaClient;

  @Post('/register', { description: '用户注册' })
  @ApiBody({ type: RegisterDto })
  public async register(@Body() body: RegisterDto) {
    const result = await this.userService.registerUser(body);
    return this.success(result);
  }

  @Post('/login', { description: '用户登录' })
  @ApiBody({ type: LoginDto })
  public async login(@Body() body: LoginDto) {
    const result = await this.userService.login(body);
    return this.success({ token: result });
  }

  @Get('/info', { description: '获取登录信息' })
  public async getInfo() {
    const { id } = this.ctx.state.user;
    const { username, phone, avatar, role } = await this.userService.findById(
      id
    );
    const backpack = await this.backpackService.findOneByUserId(id);

    const token = await this.jwtService.sign({ id, phone, username, role });

    return this.success({
      token,
      user: { id, username, phone, avatar, role },
      backpack,
    });
  }
}
