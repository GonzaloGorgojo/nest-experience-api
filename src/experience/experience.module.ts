/**
 * ExperienceModule class.
 *
 * @file   This file defines the ExperienceModule.
 * @author Gonzalo Gorgojo.
 */
import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { MapperModule } from '../mapper/mapper.module';

@Module({
  controllers: [ExperienceController],
  imports: [MapperModule],
  providers: [ExperienceService],
})
export class ExperienceModule {}
