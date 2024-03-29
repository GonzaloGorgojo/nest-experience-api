/**
 * CreateUserDto.
 *
 * Definition for CreateUserDto.
 *
 * @file   This file defines the input to create a user.
 * @author Gonzalo Gorgojo.
 */

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Class Summary
 *
 * Definition for CreateUserDto.
 *
 * @class CreateUserDto
 */

export class CreateUserDto {
  @ApiProperty({
    description: 'first name of the user',
    type: String,
    example: 'lebron',
  })
  @IsNotEmpty({ message: 'firstName is required' })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'last name of the user',
    type: String,
    example: 'James',
  })
  @IsNotEmpty({ message: 'lastName is required' })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'personal description about the user',
    type: String,
    example: 'Super friendly folk',
  })
  @IsNotEmpty({ message: 'description is required' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'personal and unique email',
    type: String,
    example: 'example@gmail.com',
  })
  @IsNotEmpty({ message: 'email is required' })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'country of residence',
    type: String,
    example: 'Argentina',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    description: 'link to linkedin profile',
    type: String,
    example: 'www.linkendin.com/lebron',
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiProperty({
    description: 'link to github profile',
    type: String,
    example: 'www.github.com/lebron',
  })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiProperty({
    description: 'personal web site',
    type: String,
    example: 'www.lebron.com',
  })
  @IsOptional()
  @IsString()
  extraLink?: string;
}
