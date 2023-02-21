import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOutputDto } from './dto/adminOutput.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserOutputDto } from './dto/userOutput.dto';
import { UserService } from './user.service';
import { CreateAdminDto } from './dto/createAdmin.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create one User.',
    description:
      'Create one new User based on the received data and store it in Db.',
  })
  @ApiCreatedResponse({ type: UserOutputDto })
  @Post('')
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() newUser: CreateUserDto): Promise<UserOutputDto> {
    return this.userService.createUser(newUser);
  }

  @ApiOperation({
    summary: 'Create one Admin User.',
    description:
      'Create one new Admin based on the received data and store it in Db.',
  })
  @ApiCreatedResponse({ type: AdminOutputDto })
  @UseGuards(JwtAuthGuard)
  @Post('/admin')
  async createAdminUser(
    @Body() newAdmin: CreateAdminDto,
  ): Promise<AdminOutputDto> {
    return this.userService.createAdminUser(newAdmin);
  }

  @Get('')
  async getAllUsers() {
    return 'hello';
  }

  @Get('/:userId')
  async getuser() {
    return 'hello';
  }

  @Put('/userId')
  @UseGuards(JwtAuthGuard)
  async updateUser() {
    return 'hello';
  }

  @Delete('/UserId')
  @UseGuards(JwtAuthGuard)
  async deleteUser() {
    return 'hello';
  }
}
