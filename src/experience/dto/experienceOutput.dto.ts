/**
 * ExperienceOutputDto.
 *
 * Definition for ExperienceOutputDto dto.
 *
 * @file   This file defines the input dto from to create one Experience resource.
 * @author Gonzalo Gorgojo.
 */

import { ApiProperty } from '@nestjs/swagger';
import { ExperienceTypeEnum } from '../enum/experienceType.enum';
import { AutoMap } from '@automapper/classes';

/**
 * Class Summary
 *
 * Definition for ExperienceOutputDto.
 *
 * @class ExperienceOutputDto
 */

export class ExperienceOutputDto {
  @ApiProperty({
    description: 'Id of the Experience resource',
    type: String,
    example: '123',
  })
  @AutoMap()
  experienceId: number;

  @ApiProperty({
    description: 'Id of the User relationated with this experience',
    type: Number,
    example: 123,
  })
  @AutoMap()
  userId: number;

  @ApiProperty({
    description: 'Date when the experience started',
    type: String,
    example: '2023-03-11T19:22:42.909Z',
  })
  @AutoMap()
  startDate: string;

  @ApiProperty({
    description: 'Date when the experience ended',
    type: String,
    example: '2023-03-11T19:22:42.909Z',
  })
  @AutoMap()
  endDate: string;

  @ApiProperty({
    description: 'Company where this experience happened',
    type: String,
    example: 'Super Company',
  })
  @AutoMap()
  company: string;

  @ApiProperty({
    description: 'Webpage of the company where this experience happened',
    type: String,
    example: 'www.supercompany.com',
  })
  @AutoMap()
  companyWebPage: string;

  @ApiProperty({
    description: 'job position on the company',
    type: String,
    example: 'full stack developer',
  })
  @AutoMap()
  position: string;

  @ApiProperty({
    description: 'Where this experience took place',
    type: String,
    example: 'Canada',
  })
  @AutoMap()
  location: string;

  @ApiProperty({
    description: 'List of skills used on this job experience',
    type: String,
    example: 'typescript, react-native',
  })
  @AutoMap()
  skills: string[];

  @ApiProperty({
    description: 'List of things done in this experience',
    type: String,
    example: 'Build web app',
  })
  @AutoMap()
  descriptions: string[];

  @ApiProperty({
    description: 'Type of contract in this experience',
    type: String,
    example: 'part-time',
  })
  @AutoMap()
  type: ExperienceTypeEnum;
}
