import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExperienceService } from './experience.service';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getExperience() {
    const response = await this.experienceService.getExperience();
    return response;
  }
}
