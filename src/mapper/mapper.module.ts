/**
 * MapperModule class.
 *
 * @file   This file defines the MapperModule.
 * @author Gonzalo Gorgojo.
 */
import { Module } from '@nestjs/common';
import { ExperienceMapper } from './experience.mapper';
import { UserMapperService } from './user.mapper';

@Module({
  providers: [UserMapperService, ExperienceMapper],
  exports: [UserMapperService, ExperienceMapper],
})
export class MapperModule {}
