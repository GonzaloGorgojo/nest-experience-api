/**
 * Authentication service logic.
 *
 * Class with authentication bussines logic implementation.
 *
 * @file   This file defines the AuthService class.
 * @author Gonzalo Gorgojo.
 */
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginOutput } from './dto/loginOutput.dto';
import { User } from './model/admin.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * @method findUsers
   * Find all users in DB.
   *
   *
   * @return list of users..
   */
  async findUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

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
      const users = await this.findUsers();

      const admin = users.find(
        (e) => e.username == user.username && e.password == user.password,
      );

      if (admin) {
        const payload = { username: user.username, sub: admin.id };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      this.logger.error(`Error method: login`);
      throw error;
    }
  }

  async create(user: User): Promise<User> {
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Error method: create`);

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
