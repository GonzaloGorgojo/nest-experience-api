/**
 * UpdateEducationDto.
 *
 * Definition for UpdateEducationDto dto.
 *
 * @file   This file defines the input dto to update one Education resource.
 * @author Gonzalo Gorgojo.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { CreateEducationDto } from './createEducation.dto';

/**
 * Class Summary
 *
 * Definition for UpdateEducationDto.
 *
 * @class UpdateEducationDto
 */

export class UpdateEducationDto extends CreateEducationDto {
  @ApiProperty({
    description: 'Id of the existing Education resource',
    type: Number,
    example: 123,
  })
  @IsNotEmpty({ message: 'educationId is required' })
  @IsNumber()
  @AutoMap()
  educationId: number;
}
