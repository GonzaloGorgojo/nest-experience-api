import { Injectable, Logger } from '@nestjs/common';
import { CreateExperienceDto } from './dto/createExperience.dto';
import { ExperienceOutputDto } from './dto/experienceOutput.dto';

@Injectable()
export class ExperienceService {
  private readonly logger = new Logger(ExperienceService.name);

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
      return new ExperienceOutputDto();
    } catch (error) {
      this.logger.error('Error Method: createExperience');
      throw error;
    }
  }

  /**
   * @method getExperience
   * Search for an User experience in DB and return all.
   *
   * @return all the experience from DB.
   */
  async getExperience() {
    try {
      return 'hey !';
    } catch (error) {
      this.logger.error('Error Method: getExperience');
      throw error;
    }
  }
}
