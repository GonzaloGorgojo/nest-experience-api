/**
 * Experience entity.
 *
 * Definition for Experience entity.
 *
 * @file   This file defines the Organization class.
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
import { ExperienceTypeEnum } from '../enum/experienceType.enum';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  @Index()
  @AutoMap()
  experienceId: number;

  @Column({ name: 'user_id', nullable: false })
  @AutoMap()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp with time zone', nullable: false })
  @AutoMap()
  startDate: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  @AutoMap()
  endDate: Date;

  @Column({ nullable: false })
  @AutoMap()
  company: string;

  @Column({ nullable: false })
  @AutoMap()
  companyWebPage: string;

  @Column({ nullable: false })
  @AutoMap()
  position: string;

  @Column({ nullable: false })
  @AutoMap()
  location: string;

  @Column('simple-array', { nullable: false })
  @AutoMap()
  skills: string[];

  @Column('simple-array', { nullable: false })
  @AutoMap()
  descriptions: string[];

  @Column({
    type: 'enum',
    enum: ExperienceTypeEnum,
    nullable: false,
  })
  @AutoMap()
  type: ExperienceTypeEnum;
}
