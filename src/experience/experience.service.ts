/**
 * ExperienceService class.
 *
 * @file   This file defines the ExperienceService, who manage all the experience related operations.
 * @author Gonzalo Gorgojo.
 */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ExperienceMapper } from '../mapper/experience.mapper';
import { User } from '../user/model/user.entity';
import { CreateExperienceDto } from './dto/createExperience.dto';
import { ExperienceOutputDto } from './dto/experienceOutput.dto';
import { Experience } from './model/experience.entity';

@Injectable()
export class ExperienceService {
  private readonly logger = new Logger(ExperienceService.name);
  constructor(
    private readonly datasource: DataSource,
    private readonly experienceMapper: ExperienceMapper,
  ) {}

  /**
   * @method createExperience
   * Add one experience to one User.
   *
   * @return the experience dto created.
   */
  async createExperience(
    newExperience: CreateExperienceDto,
  ): Promise<ExperienceOutputDto> {
    try {
      const existingUser = await this.datasource.manager.findOneBy(User, {
        userId: newExperience.userId,
      });

      if (!existingUser) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            message: `A user with id ${newExperience.userId} does not exists`,
            statusText: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      const mappedExperience =
        this.experienceMapper.mapExperienceDtoToExperienceEntity(newExperience);

      const createdExperience = await this.datasource.manager.save(
        Experience,
        mappedExperience,
      );

      return this.experienceMapper.mapExperienceEntityToExperienceOutput(
        createdExperience,
      );
    } catch (error) {
      this.logger.error('Error Method: createExperience');
      throw error;
    }
  }

  /**
   * @method getExperience
   * Search for an User experience in DB and return all.
   *
   * @param {string} userId id of the user to search
   *
   * @return all the experience from DB.
   */
  async getExperience(userId: string) {
    try {
      const allExperienceFromUSer: Experience[] =
        await this.datasource.manager.find(Experience, {
          where: { userId: Number(userId) },
        });

      return this.experienceMapper.mapExperienceEntityArrayToExperienceOutputArray(
        allExperienceFromUSer,
      );
    } catch (error) {
      this.logger.error('Error Method: getExperience');
      throw error;
    }
  }
}
