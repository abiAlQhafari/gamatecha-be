import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';
import { PostInstagram } from '../../post-instagram/entities/post-instagram.entity';

@Entity()
export class UserInstagram extends BaseEntity {
  @Column({ nullable: false })
  username: string = '';

  @Column({ nullable: true })
  profilePic: string = '';

  @OneToMany(() => PostInstagram, (postInstagram) => postInstagram.user, {
    nullable: true,
  })
  postInstagram: PostInstagram[] | null = null;
}
