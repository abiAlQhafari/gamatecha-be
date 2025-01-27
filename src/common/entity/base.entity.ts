import { Exclude } from 'class-transformer';
import {
  AfterSoftRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date = new Date();

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date = new Date();

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  @Exclude()
  deletedAt: Date | null = null;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  deletedBy?: string;
}
