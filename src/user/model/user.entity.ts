/**
 * User entity.
 *
 * Definition for User entity.
 *
 * @file   This file defines the Organization class.
 * @author Gonzalo Gorgojo.
 */
import { AutoMap } from '@automapper/classes';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @Index()
  @AutoMap()
  userId: number;

  @Column({ nullable: false })
  @AutoMap()
  firstName: string;

  @Column({ nullable: false })
  @AutoMap()
  lastName: string;

  @Column({ nullable: false })
  @AutoMap()
  description: string;

  @Column({ nullable: false, unique: true })
  @AutoMap()
  email: string;

  @Column({ nullable: true })
  @AutoMap()
  country: string;

  @Column({ nullable: true })
  @AutoMap()
  linkedin: string;

  @Column({ nullable: true })
  @AutoMap()
  github: string;

  @Column({ nullable: true })
  @AutoMap()
  extraLink: string;
}
