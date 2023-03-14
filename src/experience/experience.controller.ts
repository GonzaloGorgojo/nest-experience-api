/**
 * ExperienceController class.
 *
 * @file   This file defines the ExperienceController, who manage all the experience related endpoints.
 * @author Gonzalo Gorgojo.
 */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiCreatedResponse({ type: ExperienceOutputDto })
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createExperience(
    @Body() newExperience: CreateExperienceDto,
  ): Promise<ExperienceOutputDto> {
    return this.experienceService.createExperience(newExperience);
  }

  @ApiOperation({
    summary: 'Get all Experiences from one User.',
    description:
      'Search for all Experiences from received User in DB and retrieve them',
  })
  @ApiOkResponse({ type: ExperienceOutputDto })
  @Get('/:userId')
  async getExperience(@Param('userId') userId: string) {
    return this.experienceService.getExperience(userId);
  }
}
