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
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  @Exclude()
  deletedAt: Date | null;

  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  deletedBy?: string;
}
