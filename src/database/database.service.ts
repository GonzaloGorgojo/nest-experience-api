/**
 * DatabaseService.
 *
 * Definition for Database service, with bussines logic implementation.
 *
 * @file   This file defines DatabaseService class.
 * @author Gonzalo Gorgojo.
 */
import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Admin } from '../user/model/admin.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class DatabaseService {
  logger: Logger;

  constructor(private dataSource: DataSource) {
    this.logger = new Logger(DatabaseService.name);
  }

  async seed() {
    this.logger.log('Starting seed...');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const password = process.env.ADMIN_PASSWORD ?? '123456';
      const hashedPassword = await bcrypt.hash(password, 10);
      //we create a new admin so we can use the api
      const adminData = [
        {
          username: process.env.ADMIN_USER,
          password: hashedPassword,
        },
      ];

      const userRepository = this.dataSource.getRepository(Admin);
      await userRepository.save(adminData);
      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error(error);
      this.logger.error('Seed error!');
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
