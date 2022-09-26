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
import { LoginDto } from './dto/login.dto';
import { LoginOutput } from './dto/loginOutput.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private jwtService: JwtService) {}

  private readonly user = {
    userId: 1,
    username: 'john',
    password: '1234',
  };

  /**
   * @method login
   * Check if user and password exist and return a signed jwt
   *
   * @param {LoginDto} user dto input
   *
   * @return access token if it works, throws unauthorized if not.
   */
  async login(user: LoginDto): Promise<LoginOutput> {
    try {
      if (this.user && this.user.password === user.password) {
        const payload = { username: user.username, sub: this.user.userId };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      this.logger.error(`Error method: login}`);
      throw error;
    }
  }
}
