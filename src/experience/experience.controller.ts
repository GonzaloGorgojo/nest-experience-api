import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExperienceService } from './experience.service';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get('')
  async getExperience() {
    return this.experienceService.getExperience();
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  async createExperience() {
    return this.experienceService.createExperience();
  }
}
