import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { ArticleStatus } from '../../../common/enum/status.enum';
import { PostInstagram } from '../../post-instagram/entities/post-instagram.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Article extends BaseEntity {
  @Column({ nullable: false })
  title: string = '';

  @Column({ nullable: false })
  slug: string = '';

  @Column({ nullable: false })
  mediaUrl: string = '';

  @Column({ enum: ArticleStatus, default: ArticleStatus.ARCHIVED })
  status: ArticleStatus = ArticleStatus.ARCHIVED;

  @Column({ nullable: false })
  content: string = '';

  @Column({ nullable: true, type: 'timestamp with time zone' })
  publishedAt: Date = new Date();

  @OneToOne(() => PostInstagram, (postInstagram) => postInstagram.article, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  postInstagram: PostInstagram | null = null;

  @ManyToMany(() => Category, (category) => category.articles, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  categories: Category[] | null = null;

  @BeforeInsert()
  @BeforeUpdate()
  async slugify() {
    this.slug = this.title?.toLowerCase().replace(/ /g, '-') ?? '';
  }
}
