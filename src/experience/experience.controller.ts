import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateExperienceDto } from './dto/createExperience.dto';
import { ExperienceOutputDto } from './dto/experienceOutput.dto';
import { ExperienceService } from './experience.service';

@ApiTags('Experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOperation({
    summary: 'Create Experience for one User.',
    description:
      'Create one Experience based on the received data, associate with one User and store it in Db.',
  })
  @ApiCreatedResponse({ type: String })
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createExperience(
    @Body() newExperience: CreateExperienceDto,
  ): Promise<ExperienceOutputDto> {
    return this.experienceService.createExperience(newExperience);
  }

  @Get('')
  async getExperience() {
    return this.experienceService.getExperience();
  }
}
