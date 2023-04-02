/**
 * EducationOutputDto.
 *
 * Definition for EducationOutputDto dto.
 *
 * @file   This file defines the input dto from to create one Experience resource.
 * @author Gonzalo Gorgojo.
 */

import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

/**
 * Class Summary
 *
 * Definition for EducationOutputDto.
 *
 * @class EducationOutputDto
 */

export class EducationOutputDto {
  @ApiProperty({
    description: 'Id of the User relationated with this education',
    type: Number,
    example: 123,
  })
  @AutoMap()
  userId: number;

  @ApiProperty({
    description: 'Id of the education resource',
    type: Number,
    example: 123,
  })
  @AutoMap()
  educationId: number;

  @ApiProperty({
    description: 'Title of the education/certification',
    type: String,
    example: 'Software Engineer',
  })
  @AutoMap()
  educationTitle: string;

  @ApiProperty({
    description: 'Name of the institution that issues the certification',
    type: String,
    example: 'Amazon Web Services',
  })
  @AutoMap()
  educationInstitution: string;

  @ApiProperty({
    description: 'Link to the certification',
    type: String,
    example: 'www.google.com/supercertification/gonzalo',
  })
  @AutoMap()
  educationInstitutionLink: string;

  @ApiProperty({
    description: 'Date when the certification was issued',
    type: String,
    example: 'Apr 2022',
  })
  @AutoMap()
  dateIssued: string;

  @ApiProperty({
    description: 'Date when the course/career started',
    type: String,
    example: 'Apr 2022',
  })
  @AutoMap()
  startDate: string;

  @ApiProperty({
    description: 'Date when the course/career ended',
    type: String,
    example: 'Apr 2022',
  })
  @AutoMap()
  endDate: string;

  @ApiProperty({
    description: 'Defines if is a career or only a certification',
    type: Boolean,
    example: 'true',
  })
  @AutoMap()
  isCertification: boolean;
}
