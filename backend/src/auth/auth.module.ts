import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

@Module({
  imports: [
    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // JWT_SECRET이 없으면 서버 시작 시 즉시 오류 발생
        secret: configService.getOrThrow<string>('JWT_SECRET'),

        signOptions: {
          // 환경변수 문자열 "3600" → 숫자 3600으로 변환
          expiresIn: Number(
            configService.get<string>('JWT_EXPIRES_IN') ?? 3600,
          ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
