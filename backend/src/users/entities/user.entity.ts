import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({select: false}) //사용자 조회에서 password컬럼을 자동으로 제외하기 위함이다. (보안상 문제)
    password: string;

    @Column({unique: true})
    nickname: string;

    @CreateDateColumn()
    createdAt: Date;


}
