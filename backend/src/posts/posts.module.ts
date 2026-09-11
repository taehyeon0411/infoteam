import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { Post } from './entities/post.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Post])], //"Post"라는 엔테티를 DB에서 사용하도록 등록
  controllers: [PostsController], //게시글 관련 URL 요청을 PostsController가 처리
  providers: [PostsService], //게시글 관련 로직을 PostsService가 담당
})
export class PostsModule {}
