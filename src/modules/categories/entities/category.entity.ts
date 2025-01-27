import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { Article } from '../../articles/entities/article.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false })
  name: string = '';

  @ManyToMany(() => Article, (article) => article.categories, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  articles: Article[] | null = null;
}
