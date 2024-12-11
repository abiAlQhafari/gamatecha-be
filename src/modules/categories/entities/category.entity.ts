import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false })
  name: string = '';

  @ManyToMany(() => Category, (category) => category.articles, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  articles: Category[] | null = null;
}
