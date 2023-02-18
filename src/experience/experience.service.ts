import { Injectable } from '@nestjs/common';

@Injectable()
export class ExperienceService {
  async getExperience() {
    return 'hola';
  }
}
