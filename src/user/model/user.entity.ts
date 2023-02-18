/**
 * User entity.
 *
 * Definition for User entity.
 *
 * @file   This file defines the Organization class.
 * @author Gonzalo Gorgojo.
 */
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @Index()
  userId: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  country: string;

  @Column()
  linkedin: string;

  @Column()
  github: string;

  @Column()
  extraLink: string;
}
