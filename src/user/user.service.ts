import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Admin } from '../auth/model/admin.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly dataSource: DataSource) {}

  /**
   * @method createAdminUser
   *
   * @param {User} user dto to create.
   *
   * @returns {User} created resource.
   */
  async createAdminUser(user: Admin): Promise<Admin> {
    try {
      return this.dataSource.manager.save(Admin, user);
    } catch (error) {
      this.logger.error(`Error method: createAdminUser`);

      throw error;
    }
  }
}
