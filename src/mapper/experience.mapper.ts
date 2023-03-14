/**
 * ExperienceMapper class.
 *
 * @file   This file defines the ExperienceMapper, who manage all the mapping for user Experience.
 * @author Gonzalo Gorgojo.
 */
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from '../experience/dto/createExperience.dto';
import { ExperienceOutputDto } from '../experience/dto/experienceOutput.dto';
import { Experience } from '../experience/model/experience.entity';

@Injectable()
export class ExperienceMapper {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
  ) {
    /** @type {CreateExperienceDto} => @type {Experience} */
    createMap(
      this.mapper,
      CreateExperienceDto,
      Experience,
      forMember(
        (d) => d.skills,
        mapFrom((s) => s.skills),
      ),
      forMember(
        (d) => d.descriptions,
        mapFrom((s) => s.descriptions),
      ),
    );

    /** @type {Experience} => @type {ExperienceOutputDto} */
    createMap(this.mapper, Experience, ExperienceOutputDto);
  }

  /**
   * mapExperienceDtoToExperienceEntity.
   *
   * Maps Experience dto to Experience entity.
   *
   * @param entity Experience dto to map.
   *
   * @return Experience Entity mapped object..
   */
  mapExperienceDtoToExperienceEntity(dto: CreateExperienceDto): Experience {
    return this.mapper.map(dto, CreateExperienceDto, Experience);
  }

  /**
   * mapExperienceEntityToExperienceOutput.
   *
   * Maps Experience entity to the Experience Output object.
   *
   * @param entity Experience entity to map.
   *
   * @return ExperienceOutputDto mapped object..
   */
  mapExperienceEntityToExperienceOutput(
    entity: Experience,
  ): ExperienceOutputDto {
    return this.mapper.map(entity, Experience, ExperienceOutputDto);
  }

  /**
   * mapExperienceEntityArrayToExperienceOutputArray.
   *
   * Maps Experience entity array to the Experience Output object array.
   *
   * @param entity Experience array of entities to map.
   *
   * @return ExperienceOutputDto array of mapped objects.
   */
  mapExperienceEntityArrayToExperienceOutputArray(
    entity: Experience[],
  ): ExperienceOutputDto[] {
    return this.mapper.mapArray(entity, Experience, ExperienceOutputDto);
  }
}
