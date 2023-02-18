/**
 * TypeORM connection constant.
 *
 * Definition for TypeORM connection to DB, meant to be used to get the db connection
 * when running migrations.
 *
 * @file   This file defines the TypeORM connection to db.
 * @author Gonzalo Gorgojo.
 */

import { DataSource } from 'typeorm';
import dataSourceOptions from './ormconfig';

export const datasource = new DataSource(dataSourceOptions);
