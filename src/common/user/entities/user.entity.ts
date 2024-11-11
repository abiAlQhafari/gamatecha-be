import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../entity/base.entity';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { hash } from 'bcrypt';

@Entity('users')
@Index(['id', 'username', 'email'], {
  unique: true,
  where: '"deletedAt" IS NULL AND "deletedBy" IS NULL',
})
export class User extends BaseEntity {
  @Column({ nullable: false })
  username: string;

  @IsEmail()
  @Column({ nullable: false })
  email: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && this.password.length < 60) {
      this.password = await hash(this.password, 10);
    }
  }

  // @OneToOne(() => UserExtend, (userExtend) => userExtend.user, {
  //   cascade: true,
  // })
  // @JoinColumn()
  // userExtend?: UserExtend;
}
