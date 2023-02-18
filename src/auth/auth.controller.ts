/**
 * AuthController controller.
 *
 * Definition for AuthController controller.
 *
 * @file   This file defines the AuthController controller.
 * @author Gonzalo Gorgojo.
 */
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginOutput } from './dto/loginOutput.dto';
import { User } from './model/admin.entity';

/**
 * Class Summary
 *
 * Definition for AuthController controller.
 *
 * @class AuthController
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() input: LoginDto): Promise<LoginOutput> {
    return this.authService.login(input);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createAdminUser(@Body() user: User): Promise<User> {
    return this.authService.createAdminUser(user);
  }
}
