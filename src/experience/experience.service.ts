/**
 * ExperienceService class.
 *
 * @file   This file defines the ExperienceService, who manage all the experience related operations.
 * @author Gonzalo Gorgojo.
 */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CommonEnums } from '../common/common.enums';
import { ExperienceMapper } from '../mapper/experience.mapper';
import { User } from '../user/model/user.entity';
import { CreateExperienceDto } from './dto/createExperience.dto';
import { ExperienceOutputDto } from './dto/experienceOutput.dto';
import { UpdateExperienceDto } from './dto/updateExperience.dto';
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
            status: HttpStatus.NOT_FOUND,
            message: `A user with id ${newExperience.userId} does not exists`,
            statusText: 'Conflict',
          },
          HttpStatus.NOT_FOUND,
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
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error('Error Method: createExperience');
      }
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
  async getExperience(userId: string): Promise<ExperienceOutputDto[]> {
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

  /**
   * @method updateExperience
   * Search for an User experience in DB and update it.
   *
   * @param {UpdateExperienceDto} experience object to update.
   *
   * @return the updated experience.
   */
  async updateExperience(
    experience: UpdateExperienceDto,
  ): Promise<ExperienceOutputDto> {
    try {
      const currentExperience = await this.datasource.manager.findBy(
        Experience,
        { experienceId: experience.experienceId },
      );
      if (!currentExperience) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `There is no Experience with id ${experience.experienceId}`,
            statusText: 'Conflict',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const mappedExperience =
        this.experienceMapper.mapUpdateExperienceDtoToExperience(experience);

      const savedExperience = await this.datasource.manager.save(
        Experience,
        mappedExperience,
      );

      return this.experienceMapper.mapExperienceEntityToExperienceOutput(
        savedExperience,
      );
    } catch (error) {
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error('Error Method: updateExperience');
      }
      throw error;
    }
  }

  /**
   * @method deleteExperience
   * Search for an User experience in DB and delete it.
   *
   * @param {number} experienceId object to delete.
   *
   * @return message if successfull or error if not.
   */
  async deleteExperience(
    experienceId: number,
  ): Promise<CommonEnums.DeleteExperienceMessage> {
    try {
      const existingExperience = await this.datasource.manager.findOneBy(
        Experience,
        {
          experienceId: experienceId,
        },
      );

      if (!existingExperience) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'There is no experience with that id',
            statusText: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.datasource.manager.delete(Experience, {
        experienceId: experienceId,
      });

      return CommonEnums.DeleteExperienceMessage;
    } catch (error) {
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error('Error Method: deleteExperience');
      }
      throw error;
    }
  }
}
