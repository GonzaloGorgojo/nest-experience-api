/**
 * Experience entity.
 *
 * Definition for Experience entity.
 *
 * @file   This file defines the Organization class.
 * @author Gonzalo Gorgojo.
 */
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ExperienceType } from '../enum/experienceType.enum';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  @Index()
  experienceId: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  company: string;

  @Column()
  companyWebPage: string;

  @Column()
  position: string;

  @Column()
  location: string;

  @Column('simple-array')
  skills: string[];

  @Column('simple-array')
  descriptions: string[];

  @Column({
    type: 'enum',
    enum: ExperienceType,
  })
  type: ExperienceType;
}
