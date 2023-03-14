/**
 * CreateExperienceDto.
 *
 * Definition for CreateExperienceDto dto.
 *
 * @file   This file defines the input dto from to create one Experience resource.
 * @author Gonzalo Gorgojo.
 */

import { ApiProperty } from '@nestjs/swagger';
import { ExperienceTypeEnum } from '../enum/experienceType.enum';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';

/**
 * Class Summary
 *
 * Definition for CreateExperienceDto.
 *
 * @class CreateExperienceDto
 */

export class CreateExperienceDto {
  @ApiProperty({
    description: 'Id of the User relationated with this experience',
    type: Number,
    example: 123,
  })
  @IsNotEmpty({ message: 'userId is required' })
  @IsString()
  @AutoMap()
  userId: number;

  @ApiProperty({
    description: 'Date when the experience started',
    type: String,
    example: '2023-03-11',
  })
  @IsNotEmpty({ message: 'startDate is required' })
  @IsDateString()
  @AutoMap()
  startDate: string;

  @ApiProperty({
    description: 'Date when the experience ended',
    type: String,
    example: '2023-03-11',
  })
  @IsOptional()
  @IsDateString()
  @AutoMap()
  endDate: string;

  @ApiProperty({
    description: 'Company where this experience happened',
    type: String,
    example: 'Super Company',
  })
  @IsNotEmpty({ message: 'company is required' })
  @IsString()
  @AutoMap()
  company: string;

  @ApiProperty({
    description: 'Webpage of the company where this experience happened',
    type: String,
    example: 'www.supercompany.com',
  })
  @IsNotEmpty({ message: 'companyWebPage is required' })
  @IsString()
  @AutoMap()
  companyWebPage: string;

  @ApiProperty({
    description: 'job position on the company',
    type: String,
    example: 'full stack developer',
  })
  @IsNotEmpty({ message: 'position is required' })
  @IsString()
  @AutoMap()
  position: string;

  @ApiProperty({
    description: 'Where this experience took place',
    type: String,
    example: 'Canada',
  })
  @IsNotEmpty({ message: 'location is required' })
  @IsString()
  @AutoMap()
  location: string;

  @ApiProperty({
    description: 'List of skills used on this job experience',
    type: String,
    example: 'typescript, react-native',
  })
  @IsNotEmpty({ message: 'skills list is required' })
  @IsString()
  @AutoMap()
  skills: string[];

  @ApiProperty({
    description: 'List of things done in this experience',
    type: String,
    example: 'Build web app',
  })
  @IsNotEmpty({ message: 'descriptions is required' })
  @IsString()
  @AutoMap()
  descriptions: string[];

  @ApiProperty({
    description: 'Type of contract in this experience',
    type: String,
    example: 'part-time',
  })
  @IsNotEmpty({ message: 'type is required' })
  @IsEnum(ExperienceTypeEnum)
  @AutoMap()
  type: ExperienceTypeEnum;
}
