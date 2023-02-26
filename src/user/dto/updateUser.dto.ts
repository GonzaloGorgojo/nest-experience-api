/**
 * UpdateUserDto.
 *
 * Definition for UpdateUserDto.
 *
 * @file   This file defines the input to create a user.
 * @author Gonzalo Gorgojo.
 */

import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

/**
 * Class Summary
 *
 * Definition for UpdateUserDto.
 *
 * @class UpdateUserDto
 */

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({
    description: 'Id of the user, will be used to update',
    type: Number,
    example: '123',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
