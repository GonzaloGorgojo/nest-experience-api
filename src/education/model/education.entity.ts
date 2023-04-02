/**
 * Education entity.
 *
 * Definition for Education entity.
 *
 * @file   This file defines the Education class.
 * @author Gonzalo Gorgojo.
 */
import { AutoMap } from '@automapper/classes';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/model/user.entity';

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  @Index()
  @AutoMap()
  educationId: number;

  @Column({ name: 'user_id', nullable: false })
  @AutoMap()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false })
  @AutoMap()
  educationTitle: string;

  @Column({ nullable: false })
  @AutoMap()
  educationInstitution: string;

  @Column({ nullable: false })
  @AutoMap()
  educationInstitutionLink: string;

  @Column({ nullable: true })
  @AutoMap()
  dateIssued: string;

  @Column({ nullable: true })
  @AutoMap()
  startDate: string;

  @Column({ nullable: true })
  @AutoMap()
  endDate: string;

  @Column({ nullable: false })
  @AutoMap()
  isCertification: boolean;
}
