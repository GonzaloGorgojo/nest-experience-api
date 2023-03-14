/**
 * ExperienceController class.
 *
 * @file   This file defines the ExperienceController, who manage all the experience related endpoints.
 * @author Gonzalo Gorgojo.
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonEnums } from '../common/common.enums';
import { CreateExperienceDto } from './dto/createExperience.dto';
import { ExperienceOutputDto } from './dto/experienceOutput.dto';
import { UpdateExperienceDto } from './dto/updateExperience.dto';
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
  @Post('/create')
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
  @ApiOkResponse({ type: [ExperienceOutputDto] })
  @Get('/get/:userId')
  async getExperience(
    @Param('userId') userId: string,
  ): Promise<ExperienceOutputDto[]> {
    return this.experienceService.getExperience(userId);
  }

  @ApiOperation({
    summary: 'Update one Experience from one User.',
    description:
      'Search for one Experiencee from the received data and update it in DB',
  })
  @ApiResponse({ type: ExperienceOutputDto })
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async updateExperience(@Body() experience: UpdateExperienceDto) {
    return this.experienceService.updateExperience(experience);
  }

  @ApiOperation({
    summary: 'Delete one Experience from one User.',
    description:
      'Search for one Experiencee from the received params and delete it in DB',
  })
  @ApiResponse({ type: CommonEnums.DeleteExperienceMessage })
  @Delete('/delete/:experienceId')
  async deleteExperience(
    @Param('experienceId') experienceId: string,
  ): Promise<string> {
    return this.experienceService.deleteExperience(Number(experienceId));
  }
}
