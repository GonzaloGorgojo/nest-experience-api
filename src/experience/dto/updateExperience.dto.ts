/**
 * UpdateExperienceDto.
 *
 * Definition for UpdateExperienceDto dto.
 *
 * @file   This file defines the input dto to update one Experience resource.
 * @author Gonzalo Gorgojo.
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { CreateExperienceDto } from './createExperience.dto';

/**
 * Class Summary
 *
 * Definition for UpdateExperienceDto.
 *
 * @class UpdateExperienceDto
 */

export class UpdateExperienceDto extends CreateExperienceDto {
  @ApiProperty({
    description: 'Id of the existing Experience',
    type: Number,
    example: 123,
  })
  @IsNotEmpty({ message: 'experienceId is required' })
  @IsNumber()
  @AutoMap()
  experienceId: number;
}
