import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Admin } from '../auth/model/admin.entity';
import { CreateUser } from './dto/createUser.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create one User.',
    description: 'Create one new User based on the received data.',
  })
  @Post('')
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() user: CreateUser) {
    if (user) {
      console.log('test');
    }
    return 'hello';
  }

  @UseGuards(JwtAuthGuard)
  @Post('/admin')
  async createAdminUser(@Body() user: Admin): Promise<Admin> {
    return this.userService.createAdminUser(user);
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
