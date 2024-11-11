import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base.entity';

@Entity()
export class UserInstagram extends BaseEntity {
  @Column({ nullable: false })
  username: string;
}
