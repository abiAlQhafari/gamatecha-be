import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { ArticleStatus } from '../../../common/enum/status.enum';
import { PostInstagram } from '../../post-instagram/entities/post-instagram.entity';

@Entity()
export class Article extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false })
  mediaUrl: string;

  @Column({ enum: ArticleStatus, default: ArticleStatus.ARCHIVED })
  status: ArticleStatus;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  publishedAt: Date;

  @OneToOne(() => PostInstagram, (postInstagram) => postInstagram.article, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  postInstagram: PostInstagram;

  @BeforeInsert()
  @BeforeUpdate()
  async slugify() {
    this.slug = this.title.toLowerCase().replace(/ /g, '-');
  }
}
