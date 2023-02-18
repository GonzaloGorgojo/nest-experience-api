import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ExperienceService {
  private readonly logger = new Logger(ExperienceService.name);

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

  /**
   * @method createExperience
   * Add one experience to one User.
   *
   * @return the experience dto created.
   */
  async createExperience() {
    try {
      return 'oh';
    } catch (error) {
      this.logger.error('Error Method: createExperience');
      throw error;
    }
  }
}
