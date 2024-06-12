import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

export class LoginDto {
  @Rule(RuleType.string())
  @ApiProperty()
  public method: string;

  @Rule(RuleType.string().required())
  @ApiProperty()
  public password: string;

  @Rule(RuleType.string().pattern(/^[0-9]{11}$/))
  @ApiProperty()
  public phone: string;

  @Rule(RuleType.string().email())
  @ApiProperty()
  public email: string;

  @Rule(RuleType.string())
  @ApiProperty()
  public username: string;
}

export class RegisterDto {
  @Rule(RuleType.string().required())
  @ApiProperty()
  public password: string;

  @Rule(RuleType.string().required())
  @ApiProperty()
  public phone: string;

  @Rule(RuleType.string().email())
  @ApiProperty()
  public email: string;

  @Rule(RuleType.string().required())
  @ApiProperty()
  public username: string;
}
