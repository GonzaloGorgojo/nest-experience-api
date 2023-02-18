/**
 * User entity.
 *
 * Definition for User entity.
 *
 * @file   This file defines the Organization class.
 * @author Gonzalo Gorgojo.
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;
}
