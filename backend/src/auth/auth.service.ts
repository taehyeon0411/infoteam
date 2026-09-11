import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // POST /auth/signup
  async signup(signupDto: SignupDto) {
    const { email, password, nickname } = signupDto;

    // 이메일 중복ㄱ검사 -> users.Service.ts에서 가져옴..이거밖에 안만들건데 왜 나누었지..
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('이미 사용 중인 이메일입니다.');
    }

    // 비밀번호를 암호화한 값으로 저장
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create(
      email,
      hashedPassword,
      nickname,
    );
    return {
      message: '회원가입이 완료되었습니다.',
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    };
  }

  // POST /auth/login
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
    }
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    };
  }
}
