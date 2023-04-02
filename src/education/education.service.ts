import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CommonEnums } from 'src/common/common.enums';
import { EducationMapper } from 'src/mapper/education.mapper';
import { User } from 'src/user/model/user.entity';
import { DataSource } from 'typeorm';
import { CreateEducationDto } from './dto/createEducation.dto';
import { EducationOutputDto } from './dto/educationOutput.dto';
import { UpdateEducationDto } from './dto/updateEducation.dto';
import { Education } from './model/education.entity';

@Injectable()
export class EducationService {
  private readonly logger = new Logger(EducationService.name);
  constructor(
    private readonly datasource: DataSource,
    private readonly educationMapper: EducationMapper,
  ) {}

  /**
   * @method createEducation
   * Add one education to one User.
   *
   * @return the education dto created.
   */
  async createEducation(
    newEducation: CreateEducationDto,
  ): Promise<EducationOutputDto> {
    try {
      const existingUser = await this.datasource.manager.findOneBy(User, {
        userId: newEducation.userId,
      });

      if (!existingUser) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `A user with id ${newEducation.userId} does not exists`,
            statusText: 'Conflict',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const mappedEducation =
        this.educationMapper.mapEducationDtoToEducationEntity(newEducation);

      const createdEducation = await this.datasource.manager.save(
        Education,
        mappedEducation,
      );

      return this.educationMapper.mapEducationEntityToEducationOutput(
        createdEducation,
      );
    } catch (error) {
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error('Error Method: createEducation');
      }
      throw error;
    }
  }

  /**
   * @method getEducation
   * Search for an User experience in DB and return all.
   *
   * @param {string} userId id of the user to search
   *
   * @return all the experience from DB.
   */
  async getEducation(userId: string): Promise<EducationOutputDto[]> {
    try {
      const allEducationFromUser: Education[] =
        await this.datasource.manager.find(Education, {
          where: { userId: Number(userId) },
        });

      return this.educationMapper.mapEducationEntityArrayToEducationOutputArray(
        allEducationFromUser,
      );
    } catch (error) {
      this.logger.error('Error Method: getEducation');
      throw error;
    }
  }

  /**
   * @method updateEducation
   * Search for an User education in DB and update it.
   *
   * @param {UpdateExperienceDto} education object to update.
   *
   * @return the updated education.
   */
  async updateEducation(
    education: UpdateEducationDto,
  ): Promise<EducationOutputDto> {
    try {
      const currentEducation = await this.datasource.manager.findBy(Education, {
        educationId: education.educationId,
      });
      if (!currentEducation) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `There is no Experience with id ${education.educationId}`,
            statusText: 'Conflict',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const mappedEducation =
        this.educationMapper.mapUpdateEducationDtoToEducationEntity(education);

      const savedExperience = await this.datasource.manager.save(
        Education,
        mappedEducation,
      );

      return this.educationMapper.mapEducationEntityToEducationOutput(
        savedExperience,
      );
    } catch (error) {
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error('Error Method: updateEducation');
      }
      throw error;
    }
  }

  /**
   * @method deleteEducation
   * Search for an User education in DB and delete it.
   *
   * @param {number} educationId object to delete.
   *
   * @return message if successfull or error if not.
   */
  async deleteEducation(
    educationId: number,
  ): Promise<CommonEnums.DeleteEducationMessage> {
    try {
      const existingEducation = await this.datasource.manager.findOneBy(
        Education,
        {
          educationId: educationId,
        },
      );

      if (!existingEducation) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'There is no Education with that id',
            statusText: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.datasource.manager.delete(Education, {
        educationId: educationId,
      });

      return CommonEnums.DeleteEducationMessage;
    } catch (error) {
      if (error.status != HttpStatus.NOT_FOUND) {
        this.logger.error('Error Method: deleteEducation');
      }
      throw error;
    }
  }
}
