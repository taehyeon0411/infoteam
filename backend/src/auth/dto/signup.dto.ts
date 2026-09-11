import { IsEmail, IsNotEmpty, IsString, MinLength, minLength } from "class-validator";

export class SignupDto { //signup관련 형식 설정


    @IsEmail({}, {message: '올바른 이메일 형식이 아닙니다.'})
    email: string;

    @IsString()
    @MinLength(8, {
        message: '비밀번호는 8자 이상이어야 합니다.'
    })
    password: string;

    @IsString()
    @IsNotEmpty({
        message: '닉네임을 입력해주세요'
    })
    nickname: string;
}