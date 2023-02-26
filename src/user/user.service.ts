import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
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
import { UpdateUserDto } from './dto/updateUser.dto';
import { CommonEnums } from '../common/common.enums';

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

      createMap(this.mapper, User, UserOutputDto);

      return this.mapper.map(createdUser, User, UserOutputDto);
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

      createMap(this.mapper, Admin, AdminOutputDto);

      return this.mapper.map(createdAdmin, Admin, AdminOutputDto);
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

      createMap(this.mapper, User, UserOutputDto);

      return this.mapper.mapArray(existingUsers, User, UserOutputDto);
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

      createMap(this.mapper, User, UserOutputDto);

      return this.mapper.map(existingUser, User, UserOutputDto);
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

      createMap(
        this.mapper,
        UpdateUserDto,
        User,
        forMember(
          (d) => d.userId,
          mapFrom((s) => s.userId),
        ),
        forMember(
          (d) => d.firstName,
          mapFrom((s) => s.firstName),
        ),
        forMember(
          (d) => d.lastName,
          mapFrom((s) => s.lastName),
        ),
        forMember(
          (d) => d.email,
          mapFrom((s) => s.email),
        ),
        forMember(
          (d) => d.description,
          mapFrom((s) => s.description),
        ),
        forMember(
          (d) => d.country,
          mapFrom((s) => (s.country ? s.country : null)),
        ),
        forMember(
          (d) => d.linkedin,
          mapFrom((s) => (s.linkedin ? s.linkedin : null)),
        ),
        forMember(
          (d) => d.github,
          mapFrom((s) => (s.github ? s.github : null)),
        ),
        forMember(
          (d) => d.extraLink,
          mapFrom((s) => (s.extraLink ? s.extraLink : null)),
        ),
      );
      const userToUpdate = this.mapper.map(userBody, UpdateUserDto, User);

      const updatedUser = await this.dataSource.manager.save(
        User,
        userToUpdate,
      );

      createMap(this.mapper, User, UserOutputDto);
      return this.mapper.map(updatedUser, User, UserOutputDto);
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
   * @param {string} userEmail payload to update.
   *
   * @returns {string} succesfull message.
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

      return CommonEnums.DeleteMessage;
    } catch (error) {
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error(`Method: deleteOneUser, error: ${error.message}.`);
      }
      throw error;
    }
  }
}
