import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity.js';
import { NotFoundError } from 'rxjs';
import { CreatePostDto } from './dto/create-post.dto.js';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) 
    private readonly postsRepository: Repository<Post>,
  ) {} //post와 연결된 데이터베이스 테이블을 다룰 수 있는걸  postsRepository라는 이름으로 가져옴.


  //Controller.ts 확인 /api/posts 요청에서 호출되는 게시글 전체 조회 메서드
  async findAll() {
    const posts = await this.postsRepository.find({
      order: {
        createdAt: 'DESC', //최신순
      },
    });

    // 프론트엔드에 반환할 구조
    return {
      totalCount: posts.length,
      items: posts,
    };
  }
  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: {id},
    });

    console.log(post);

    if(!post) {
      throw new NotFoundException (
        "ID가 $(id)인 게시글을 찾을 수 없습니다."
      )
    }
    return post;
  }
   async create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create({
      ...createPostDto,

      // 문자열을 Date 타입으로 변환
      foundAt: new Date(createPostDto.foundAt),

      // 새 글은 기본적으로 OPEN 상태
      status: "OPEN",
    });

    return this.postsRepository.save(post);
  }
}
