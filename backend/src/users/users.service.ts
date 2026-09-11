import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 회원가입 전 이메일 중복 확인용
  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  /*
    User Entity에서 password는 select: false로 설정했다.
    로그인 시 비밀번호 비교를 위해서만 명시적으로 password를 가져온다.
  */
  findByEmailWithPassword(email: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  // 회원가입 후 사용자 저장
  create(email: string, password: string, nickname: string) {
    const user = this.usersRepository.create({
      email,
      password,
      nickname,
    });

    return this.usersRepository.save(user);
  }

  // 나중에 내 정보 조회, 게시글 작성자 조회 등에 사용
  findById(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }
}
