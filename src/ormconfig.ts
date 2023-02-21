/**
 * TypeORM configuration constant.
 *
 * Definition for TypeORM configuration constant.
 *
 * @file   This file defines the TypeORM configuration constant.
 * @author Gonzalo Gorgojo.
 */

import { DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrationsTableName: '_migrations',
  migrationsRun: false,
  logging: process.env.DB_LOG_TERM
    ? process.env.DB_LOG_TERM.toLowerCase() == 'true'
    : false,
  migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
  migrationsTransactionMode: 'all',
  subscribers: [
    `${__dirname}/**/*.subscriber{.ts,.js}`,
    'dist/**/*.subscriber{ .ts,.js}',
  ],
};

export = dataSourceOptions;
