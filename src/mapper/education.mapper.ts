/**
 * EducationMapper class.
 *
 * @file   This file defines the EducationMapper, who manage all the mapping for User Education.
 * @author Gonzalo Gorgojo.
 */
import { createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from 'src/education/dto/createEducation.dto';
import { EducationOutputDto } from 'src/education/dto/educationOutput.dto';
import { UpdateEducationDto } from 'src/education/dto/updateEducation.dto';
import { Education } from 'src/education/model/education.entity';

@Injectable()
export class EducationMapper {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
  ) {
    /** @type {CreateEducationDto} => @type {Education} */
    createMap(this.mapper, CreateEducationDto, Education);

    /** @type {Education} => @type {EducationOutputDto} */
    createMap(this.mapper, Education, EducationOutputDto);

    /** @type {UpdateEducationDto} => @type {Education} */
    createMap(this.mapper, UpdateEducationDto, Education);
  }

  /**
   * mapEducationDtoToEducationEntity.
   *
   * Maps Education dto to Education entity.
   *
   * @param dto Education dto to map.
   *
   * @return Education Entity mapped object.
   */
  mapEducationDtoToEducationEntity(dto: CreateEducationDto): Education {
    return this.mapper.map(dto, CreateEducationDto, Education);
  }

  /**
   * mapUpdateEducationDtoToEducationEntity.
   *
   * Maps updateEducation dto to Education entity.
   *
   * @param dto updateEducation dto to map.
   *
   * @return Education Entity mapped object.
   */
  mapUpdateEducationDtoToEducationEntity(dto: UpdateEducationDto): Education {
    return this.mapper.map(dto, UpdateEducationDto, Education);
  }

  /**
   * mapEducationEntityToEducationOutput.
   *
   * Maps Education entity to Education dto.
   *
   * @param entity Education to map.
   *
   * @return EducationOutput dto.
   */
  mapEducationEntityToEducationOutput(entity: Education): EducationOutputDto {
    return this.mapper.map(entity, Education, EducationOutputDto);
  }

  /**
   * mapEducationEntityArrayToEducationOutputArray.
   *
   * Maps Education entity array to Education dto array.
   *
   * @param entity Education array to map.
   *
   * @return EducationOutput dto array.
   */
  mapEducationEntityArrayToEducationOutputArray(
    entity: Education[],
  ): EducationOutputDto[] {
    return this.mapper.mapArray(entity, Education, EducationOutputDto);
  }
}
