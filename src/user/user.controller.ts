/**
 * UserController class.
 *
 * @file   This file defines the UserController, who manage all the users related endpoints.
 * @author Gonzalo Gorgojo.
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminOutputDto } from './dto/adminOutput.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserOutputDto } from './dto/userOutput.dto';
import { UserService } from './user.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CommonEnums } from '../common/common.enums';

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
  @UseGuards(JwtAuthGuard)
  @Post('/create')
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
  @Post('/create/admin')
  async createAdminUser(
    @Body() newAdmin: CreateAdminDto,
  ): Promise<AdminOutputDto> {
    return this.userService.createAdminUser(newAdmin);
  }

  @ApiOperation({
    summary: 'Get all users from DB.',
    description: 'Search for all existing users in DB and return them.',
  })
  @ApiResponse({ type: [UserOutputDto] })
  @Get('/get')
  async getAllUsers(): Promise<UserOutputDto[]> {
    return this.userService.getAllUser();
  }

  @ApiOperation({
    summary: 'Get one user from DB.',
    description:
      'Search for an existing user with the received email and return it.',
  })
  @ApiResponse({ type: UserOutputDto })
  @Get('/get/:userEmail')
  async getuser(@Param('userEmail') userEmail: string): Promise<UserOutputDto> {
    return this.userService.getOneUser(userEmail);
  }

  @ApiOperation({
    summary: 'Update one user from DB.',
    description:
      'Search for an existing user with the received email and update it.',
  })
  @ApiResponse({ type: UserOutputDto })
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async updateUser(@Body() userBody: UpdateUserDto): Promise<UserOutputDto> {
    return this.userService.updateOneUser(userBody);
  }

  @ApiOperation({
    summary: 'Delete one user from DB.',
    description:
      'Search for an existing user with the received email and delete it.',
  })
  @ApiResponse({ type: CommonEnums.DeleteUserMessage })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:userEmail')
  async deleteUser(@Param('userEmail') userEmail: string): Promise<string> {
    return this.userService.deleteOneUser(userEmail);
  }
}
