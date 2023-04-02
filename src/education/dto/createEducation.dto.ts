/**
 * CreateEducationDto.
 *
 * Definition for CreateEducationDto dto.
 *
 * @file   This file defines the input dto to create one Education resource.
 * @author Gonzalo Gorgojo.
 */

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';

/**
 * Class Summary
 *
 * Definition for CreateEducationDto.
 *
 * @class CreateEducationDto
 */

export class CreateEducationDto {
  @ApiProperty({
    description: 'Id of the User relationated with this education',
    type: Number,
    example: 123,
  })
  @IsNotEmpty({ message: 'userId is required' })
  @IsNumber()
  @AutoMap()
  userId: number;

  @ApiProperty({
    description: 'Title of the education/certification',
    type: String,
    example: 'Software Engineer',
  })
  @IsNotEmpty({ message: 'educationTitle is required' })
  @IsString()
  @AutoMap()
  educationTitle: string;

  @ApiProperty({
    description: 'Name of the institution that issues the certification',
    type: String,
    example: 'Amazon Web Services',
  })
  @IsNotEmpty({ message: 'educationInstitution is required' })
  @IsString()
  @AutoMap()
  educationInstitution: string;

  @ApiProperty({
    description: 'Link to the certification',
    type: String,
    example: 'www.google.com/supercertification/gonzalo',
  })
  @IsNotEmpty({ message: 'educationInstitutionLink is required' })
  @IsString()
  @AutoMap()
  educationInstitutionLink: string;

  @ApiProperty({
    description: 'Date when the certification was issued',
    type: String,
    example: 'Apr 2022',
  })
  @IsOptional()
  @IsString()
  @AutoMap()
  dateIssued: string;

  @ApiProperty({
    description: 'Date when the course/career started',
    type: String,
    example: 'Apr 2022',
  })
  @IsOptional()
  @IsString()
  @AutoMap()
  startDate: string;

  @ApiProperty({
    description: 'Date when the course/career ended',
    type: String,
    example: 'Apr 2022',
  })
  @IsOptional()
  @IsString()
  @AutoMap()
  endDate: string;

  @ApiProperty({
    description: 'Defines if is a career or only a certification',
    type: Boolean,
    example: 'true',
  })
  @IsNotEmpty({ message: 'isCertification is required' })
  @IsBoolean()
  @AutoMap()
  isCertification: boolean;
}
