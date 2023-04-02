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
import { EducationService } from './education.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EducationOutputDto } from './dto/educationOutput.dto';
import { CreateEducationDto } from './dto/createEducation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommonEnums } from 'src/common/common.enums';
import { UpdateEducationDto } from './dto/updateEducation.dto';

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @ApiOperation({
    summary: 'Create Education for one User.',
    description:
      'Create one Education based on the received data, associate with one User and store it in Db.',
  })
  @ApiCreatedResponse({ type: EducationOutputDto })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createEducation(
    @Body() newExperience: CreateEducationDto,
  ): Promise<EducationOutputDto> {
    return this.educationService.createEducation(newExperience);
  }

  @ApiOperation({
    summary: 'Get all Education from one User.',
    description:
      'Search for all Education from received User in DB and retrieve them',
  })
  @ApiOkResponse({ type: [EducationOutputDto] })
  @Get('/get/:userId')
  async getEducation(
    @Param('userId') userId: string,
  ): Promise<EducationOutputDto[]> {
    return this.educationService.getEducation(userId);
  }

  @ApiOperation({
    summary: 'Update one Education from one User.',
    description:
      'Search for one Education from the received data and update it in DB',
  })
  @ApiResponse({ type: EducationOutputDto })
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async updateEducation(
    @Body() education: UpdateEducationDto,
  ): Promise<EducationOutputDto> {
    return this.educationService.updateEducation(education);
  }

  @ApiOperation({
    summary: 'Delete one Education resource from one User.',
    description:
      'Search for one Education from the received params and delete it in DB',
  })
  @ApiResponse({ type: CommonEnums.DeleteEducationMessage })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:educationId')
  async deleteEducation(
    @Param('educationId') educationId: string,
  ): Promise<CommonEnums.DeleteEducationMessage> {
    return this.educationService.deleteEducation(Number(educationId));
  }
}
