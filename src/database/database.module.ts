/**
 * DatabaseModule.
 *
 * Definition for Database Module, with database interaction and configuration.
 *
 * @file   This file defines DatabaseModule class.
 * @author Gonzalo Gorgojo.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
  ],
  exports: [TypeOrmModule],
  providers: [DatabaseService],
})

/**
 * Class Summary
 *
 * Definition for Database Module, with database interaction and configuration.
 *
 * @class DatabaseModule
 */
export class DatabaseModule {}
