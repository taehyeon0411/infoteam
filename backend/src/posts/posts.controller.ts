import { Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';

@Controller('api/posts') //서비스의 기본 API 주소를 정함 -> api쓴거 까먹고 프론트엔드로 요청보내고 있었음 하
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    console.log(id);
    return this.postsService.findOne(id)
  }
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }
  
}
