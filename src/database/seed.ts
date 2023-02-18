/**
 * Seed database starting point.
 *
 * Definition for Seed database starting point.
 *
 * @file   This file defines the Seed database starting point.
 * @author Gonzalo Gorgojo.
 */

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { DatabaseService } from './database.service';

async function bootstrapAndRunSeed() {
  const logger: Logger = new Logger(bootstrapAndRunSeed.name);

  try {
    const initializedApp = await NestFactory.createApplicationContext(
      DatabaseModule,
    );
    const database = initializedApp.get(DatabaseService);

    await database.seed();
    logger.log('Seed ok!');
    process.exit(0);
  } catch (error) {
    this.logger.error('Error method: bootstrapAndRunSeed');
    logger.log('Seed error!');
    throw error;
  }
}
bootstrapAndRunSeed();
