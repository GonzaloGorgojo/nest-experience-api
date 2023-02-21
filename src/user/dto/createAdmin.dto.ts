/**
 * CreateAdminDto.
 *
 * Definition for CreateAdminDto.
 *
 * @file   This file defines the input to create a user.
 * @author Gonzalo Gorgojo.
 */

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Class Summary
 *
 * Definition for CreateAdminDto.
 *
 * @class CreateAdminDto
 */

export class CreateAdminDto {
  @ApiProperty({
    description: 'username for the admin',
    type: String,
    example: 'superadmin',
  })
  @IsNotEmpty({ message: 'username is required' })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'last name of the user',
    type: String,
    example: 'superpassword1',
  })
  @IsNotEmpty({ message: 'password is required' })
  @IsString()
  password: string;
}
