import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// PostgreSQL의 posts 테이블과 연결한다.
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'item_name',
    type: 'varchar',
    length: 100,
  })
  itemName: string;
  @Column({
    type: 'varchar',
    length: 50,
  })
  category: string;
  @Column({
    name: 'found_location',
    type: 'varchar',
    length: 150,
  })
  foundLocation: string;
  @Column({
    name: 'found_at',
    type: 'timestamp',
  })
  foundAt: Date;
  @Column({
    type: 'text',
  })
  description: string;
  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  imageUrl: string | null;
  @Column({
    name: 'storage_location',
    type: 'varchar',
    length: 150,
  })
  storageLocation: string;
  @Column({
    type: 'varchar',
    length: 200,
  })
  contact: string;
  @Column({
    type: 'varchar',
    length: 20,
    default: 'OPEN',
  })
  status: string;
  @Column({
    type: 'varchar',
    length: 20,
    default: '분실물',
  })
  lost_found: string;
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;
}
