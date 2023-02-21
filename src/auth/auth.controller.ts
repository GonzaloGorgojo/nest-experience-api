/**
 * AuthController controller.
 *
 * Definition for AuthController controller.
 *
 * @file   This file defines the AuthController controller.
 * @author Gonzalo Gorgojo.
 */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginOutput } from './dto/loginOutput.dto';

/**
 * Class Summary
 *
 * Definition for AuthController controller.
 *
 * @class AuthController
 */

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Authenticate one user.',
    description:
      'Check if the user and password exist in Db and return a token.',
  })
  @ApiCreatedResponse({ type: LoginOutput })
  @Post('/login')
  async login(@Body() input: LoginDto): Promise<LoginOutput> {
    return this.authService.login(input);
  }
}
