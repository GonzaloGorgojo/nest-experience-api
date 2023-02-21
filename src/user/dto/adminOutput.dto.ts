/**
 * AdminOutputDto.
 *
 * Definition for AdminOutputDto dto.
 *
 * @file   This file defines the dto for admin output.
 * @author Gonzalo Gorgojo.
 */

import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

/**
 * Class Summary
 *
 * Definition for AdminOutputDto.
 *
 * @class AdminOutputDto
 */

export class AdminOutputDto {
  @ApiProperty({
    description: 'username of the admin',
    type: String,
    example: 'superAdmin',
  })
  @AutoMap()
  username: string;
}
