/**
 * UserService class.
 *
 * @file   This file defines the UserService, who manage all the users related operations.
 * @author Gonzalo Gorgojo.
 */

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Admin } from './model/admin.entity';
import { AdminOutputDto } from './dto/adminOutput.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserOutputDto } from './dto/userOutput.dto';
import { User } from './model/user.entity';
import { CreateAdminDto } from './dto/createAdmin.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CommonEnums } from 'src/common/common.enums';
import { UserMapperService } from 'src/mapper/user.mapper';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly userMapper: UserMapperService,
  ) {}

  /**
   * @method createUser
   *
   * @param {CreateUser} newUser dto to create user resource.
   *
   * @returns {UserOutputDto} created user resource.
   */
  async createUser(newUser: CreateUserDto): Promise<UserOutputDto> {
    let createdUser = new User();
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

      createdUser = await this.dataSource.manager.save(User, newUser);

      return this.userMapper.mapUserEntityToUserOutputDto(createdUser);
    } catch (error) {
      if (error.status != HttpStatus.CONFLICT) {
        this.logger.error(`Method: createUser, error: ${error.message}.`);
      }
      //rollback in case something happen after creation
      await this.dataSource.manager.delete(User, {
        userId: createdUser.userId,
      });
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
    let createdAdmin = new Admin();
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

      createdAdmin = await this.dataSource.manager.save(Admin, newAdminUser);

      return this.userMapper.mapAdminEntityToAdminOutputDto(createdAdmin);
    } catch (error) {
      if (error.status != HttpStatus.CONFLICT) {
        this.logger.error(`Method: createAdminUser, error: ${error.message}.`);
      }
      await this.dataSource.manager.delete(Admin, {
        id: createdAdmin.id,
      });
      throw error;
    }
  }

  /**
   * @method getAllUser
   *
   *
   * @returns {UserOutputDto[]} all users found.
   */
  async getAllUser(): Promise<UserOutputDto[]> {
    try {
      const existingUsers = await this.dataSource.manager.find(User);

      return this.userMapper.mapUserEntityArrayToUserOutputDtoArray(
        existingUsers,
      );
    } catch (error) {
      this.logger.error(`Method: getAllUser, error: ${error.message}.`);

      throw error;
    }
  }

  /**
   * @method getOneUser
   *
   * @param {string} userEmail email of the user to search.
   *
   * @returns {UserOutputDto} all users found.
   */
  async getOneUser(userEmail: string): Promise<UserOutputDto> {
    try {
      const existingUser = await this.dataSource.manager.findOneBy(User, {
        email: userEmail,
      });

      if (!existingUser) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'There is no user with that email',
            statusText: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return this.userMapper.mapUserEntityToUserOutputDto(existingUser);
    } catch (error) {
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error(`Method: getOneUser, error: ${error.message}.`);
      }
      throw error;
    }
  }

  /**
   * @method updateOneUser
   *
   * @param {UpdateUserDto} userBody payload to update.
   *
   * @returns {UserOutputDto} all users found.
   */
  async updateOneUser(userBody: UpdateUserDto): Promise<UserOutputDto> {
    let existingUser = new User();
    try {
      const foundUser = await this.dataSource.manager.findOneBy(User, {
        userId: userBody.userId,
      });

      if (!foundUser) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'There is no user with that id',
            statusText: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      //will use in case of rollback
      existingUser = foundUser;

      const userToUpdate =
        this.userMapper.mapUpdateUserDtoToUserEntity(userBody);

      const updatedUser = await this.dataSource.manager.save(
        User,
        userToUpdate,
      );

      return this.userMapper.mapUserEntityToUserOutputDto(updatedUser);
    } catch (error) {
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error(`Method: updateOneUser, error: ${error.message}.`);
        await this.dataSource.manager.save(User, existingUser);
      }
      throw error;
    }
  }

  /**
   * @method deleteOneUser
   *
   * @param {string} userEmail email of the user to delete.
   *
   * @returns {string} succesfull message or error.
   */
  async deleteOneUser(userEmail: string): Promise<string> {
    try {
      const existingUser = await this.dataSource.manager.findOneBy(User, {
        email: userEmail,
      });

      if (!existingUser) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'There is no user with that email',
            statusText: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.dataSource.manager.delete(User, {
        email: userEmail,
      });

      return CommonEnums.DeleteUserMessage;
    } catch (error) {
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error(`Method: deleteOneUser, error: ${error.message}.`);
      }
      throw error;
    }
  }
}
