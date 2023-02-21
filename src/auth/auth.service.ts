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
import { Admin } from '../user/model/admin.entity';
import * as bcrypt from 'bcryptjs';

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
   * @return {LoginOutput} access token if it works, throws unauthorized if not.
   */
  async login(user: LoginDto): Promise<LoginOutput> {
    try {
      const users = await this.dataSource.manager.find(Admin);

      const admin = users.find(
        async (e) =>
          e.username == user.username &&
          (await bcrypt.compare(user.password, e.password)),
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
}
