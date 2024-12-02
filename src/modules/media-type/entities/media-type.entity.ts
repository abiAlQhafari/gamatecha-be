import { Column, Entity, OneToMany } from 'typeorm';
import { PostInstagram } from '../../post-instagram/entities/post-instagram.entity';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
export class MediaType extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => PostInstagram, (postInstagram) => postInstagram.mediaType)
  postInstagram: PostInstagram[];
}
