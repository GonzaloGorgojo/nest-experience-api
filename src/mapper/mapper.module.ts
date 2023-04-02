/**
 * MapperModule class.
 *
 * @file   This file defines the MapperModule.
 * @author Gonzalo Gorgojo.
 */
import { Module } from '@nestjs/common';
import { EducationMapper } from './education.mapper';
import { ExperienceMapper } from './experience.mapper';
import { UserMapperService } from './user.mapper';

@Module({
  providers: [UserMapperService, ExperienceMapper, EducationMapper],
  exports: [UserMapperService, ExperienceMapper, EducationMapper],
})
export class MapperModule {}
