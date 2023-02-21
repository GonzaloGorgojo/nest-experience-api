import { createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Admin } from './model/admin.entity';
import { AdminOutputDto } from './dto/adminOutput.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserOutputDto } from './dto/userOutput.dto';
import { User } from './model/user.entity';
import { CreateAdminDto } from './dto/createAdmin.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  /**
   * @method createUser
   *
   * @param {CreateUser} newUser dto to create user resource.
   *
   * @returns {UserOutputDto} created user resource.
   */
  async createUser(newUser: CreateUserDto): Promise<UserOutputDto> {
    try {
      //first we search if that user email already exist, it should be unique.
      const existingUser = await this.dataSource.manager.findOne(User, {
        where: {
          email: newUser.email,
        },
      });
      if (existingUser) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'A user with this email already exists',
            statusText: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      const createdUser = await this.dataSource.manager.save(User, newUser);

      createMap(this.mapper, User, UserOutputDto);

      return this.mapper.map(createdUser, User, UserOutputDto);
    } catch (error) {
      if (error.status != HttpStatus.CONFLICT) {
        this.logger.error(`Method: createUser, error: ${error.message}.`);
        await this.dataSource.manager.delete(User, { email: newUser.email });
      }
      throw error;
    }
  }

  /**
   * @method createAdminUser
   *
   * @param {CreateAdminDto} newAdminUser dto to create admin resource.
   *
   * @returns {AdminOutputDto} created Admin resource.
   */
  async createAdminUser(newAdminUser: CreateAdminDto): Promise<AdminOutputDto> {
    try {
      //first we search if that username already exist, it should be unique.
      const existingUser = await this.dataSource.manager.findOne(Admin, {
        where: {
          username: newAdminUser.username,
        },
      });
      if (existingUser) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: 'A user with this username already exists',
            statusText: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      //we hash and salt the password
      newAdminUser.password = await bcrypt.hash(newAdminUser.password, 10);

      const createdAdmin = await this.dataSource.manager.save(
        Admin,
        newAdminUser,
      );

      createMap(this.mapper, Admin, AdminOutputDto);

      return this.mapper.map(createdAdmin, Admin, AdminOutputDto);
    } catch (error) {
      if (error.status != HttpStatus.CONFLICT) {
        this.logger.error(`Method: createAdminUser, error: ${error.message}.`);
        await this.dataSource.manager.delete(Admin, {
          username: newAdminUser.username,
        });
      }
      throw error;
    }
  }
}
