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
import { ExperienceType } from '../enum/experienceType.enum';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  @Index()
  @AutoMap()
  experienceId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  @AutoMap()
  user: User;

  @Column()
  @AutoMap()
  startDate: Date;

  @Column()
  @AutoMap()
  endDate: Date;

  @Column()
  @AutoMap()
  company: string;

  @Column()
  @AutoMap()
  companyWebPage: string;

  @Column()
  @AutoMap()
  position: string;

  @Column()
  @AutoMap()
  location: string;

  @Column('simple-array')
  @AutoMap()
  skills: string[];

  @Column('simple-array')
  @AutoMap()
  descriptions: string[];

  @Column({
    type: 'enum',
    enum: ExperienceType,
  })
  @AutoMap()
  type: ExperienceType;
}
