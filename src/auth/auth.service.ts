/**
 * Authentication service logic.
 *
 * Class with authentication bussines logic implementation.
 *
 * @file   This file defines the AuthService class.
 * @author Gonzalo Gorgojo.
 */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginOutput } from './dto/loginOutput.dto';
import { User } from './model/admin.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * @method login
   * Check if user and password exist and return a signed jwt
   *
   * @param {LoginDto} user dto input data to login.
   *
   * @return access token if it works, throws unauthorized if not.
   */
  async login(user: LoginDto): Promise<LoginOutput> {
    try {
      const users = await this.dataSource.manager.find(User);

      const admin = users.find(
        (e) => e.username == user.username && e.password == user.password,
      );

      if (!admin) throw new UnauthorizedException();

      const payload = { username: admin.username, sub: admin.id };
      const loginResponse = new LoginOutput();
      loginResponse.accessToken = this.jwtService.sign(payload);

      return loginResponse;
    } catch (error) {
      if (error.name != 'UnauthorizedException') {
        this.logger.error(`Error method: login`);
      }
      throw error;
    }
  }

  /**
   * @method createAdminUser
   *
   * @param {User} user dto to create.
   *
   * @returns {User} created resource.
   */
  async createAdminUser(user: User): Promise<User> {
    try {
      return this.dataSource.manager.save(User, user);
    } catch (error) {
      this.logger.error(`Error method: createAdminUser`);

      throw error;
    }
  }
}
