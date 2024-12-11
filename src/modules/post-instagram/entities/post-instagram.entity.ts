import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { MediaType } from '../../media-type/entities/media-type.entity';
import { UserInstagram } from '../../user-instagram/entities/user-instagram.entity';
import { Article } from '../../articles/entities/article.entity';

@Entity()
export class PostInstagram extends BaseEntity {
  @Column({ unique: true, nullable: false })
  instagramPk: string = '';

  @Column({ unique: true, nullable: false })
  instagramId: string = '';

  @Column({ unique: true, nullable: false })
  code: string = '';

  @Column()
  takenAt: Date = new Date();

  @Column({ nullable: false })
  thumbnailUrl: string = '';

  @Column({ nullable: false })
  mediaUrl: string = '';

  @Column({ nullable: false })
  caption: string = '';

  @Column()
  postUrl: string = '';

  @ManyToOne(() => MediaType, (mediaType) => mediaType.postInstagram, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  mediaType: number | null = null;

  @ManyToOne(
    () => UserInstagram,
    (userInstagram) => userInstagram.postInstagram,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  user: UserInstagram | null = null;

  @OneToOne(() => Article, (article) => article.postInstagram, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  article: Article | null = null;
}
