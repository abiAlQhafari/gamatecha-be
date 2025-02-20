import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
@Index(['ipAddr', 'userAgent'], { unique: true }) // Membantu mencegah duplikasi
export class ArticleView extends BaseEntity {
  @ManyToOne(() => Article, (article) => article.articleViews, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Index()
  article: Article;

  @Column({
    nullable: false,
  })
  ipAddr: string;

  @Column({
    nullable: false,
  })
  userAgent: string;
}
