/**
 * UserOutputDto.
 *
 * Definition for UserOutputDto dto.
 *
 * @file   This file defines the output dto from user resource.
 * @author Gonzalo Gorgojo.
 */

import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

/**
 * Class Summary
 *
 * Definition for UserOutputDto.
 *
 * @class UserOutputDto
 */

export class UserOutputDto {
  @ApiProperty({
    description: 'first name of the user',
    type: Number,
    example: 1,
  })
  @AutoMap()
  userId: number;

  @ApiProperty({
    description: 'first name of the user',
    type: String,
    example: 'lebron',
  })
  @AutoMap()
  firstName: string;

  @ApiProperty({
    description: 'last name of the user',
    type: String,
    example: 'James',
  })
  @AutoMap()
  lastName: string;

  @ApiProperty({
    description: 'personal description about the user',
    type: String,
    example: 'Super friendly folk',
  })
  @AutoMap()
  description: string;

  @ApiProperty({
    description: 'personal and unique email',
    type: String,
    example: 'example@gmail.com',
  })
  @AutoMap()
  email: string;

  @ApiProperty({
    description: 'country of residence',
    type: String,
    example: 'Argentina',
  })
  @AutoMap()
  country?: string;

  @ApiProperty({
    description: 'link to linkedin profile',
    type: String,
    example: 'www.linkendin.com/lebron',
  })
  @AutoMap()
  linkedin?: string;

  @ApiProperty({
    description: 'link to github profile',
    type: String,
    example: 'www.github.com/lebron',
  })
  @AutoMap()
  github?: string;

  @ApiProperty({
    description: 'personal web site',
    type: String,
    example: 'www.lebron.com',
  })
  @AutoMap()
  extraLink?: string;
}
