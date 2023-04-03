import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { CreateExperienceDto } from './dto/createExperience.dto';
import { ExperienceOutputDto } from './dto/experienceOutput.dto';
import { UpdateExperienceDto } from './dto/updateExperience.dto';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

describe('ExperienceController', () => {
  let controller: ExperienceController;

  const fakeDataSrc: Partial<DataSource> = {};
  const fakeExperienceService: Partial<ExperienceService> = {
    createExperience: jest
      .fn()
      .mockReturnValue(createMock<ExperienceOutputDto>()),
    getExperience: jest
      .fn()
      .mockReturnValue([createMock<ExperienceOutputDto>()]),
    updateExperience: jest
      .fn()
      .mockReturnValue(createMock<ExperienceOutputDto>()),
    deleteExperience: jest.fn().mockReturnValue(''),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperienceController],
      providers: [
        { provide: ExperienceService, useValue: fakeExperienceService },
        {
          provide: DataSource,
          useValue: fakeDataSrc,
        },
      ],
    }).compile();

    controller = module.get<ExperienceController>(ExperienceController);
  });

  it('Should create one Experience', async () => {
    const createdExperience = await controller.createExperience(
      createMock<CreateExperienceDto>(),
    );
    expect(createdExperience).toBeDefined();
    expect(fakeExperienceService.createExperience).toHaveBeenCalledTimes(1);
  });

  it('Should get all Experience from one User from DB', async () => {
    const allExperiences = await controller.getExperience('1');
    expect(allExperiences).toBeDefined();
    expect(fakeExperienceService.getExperience).toHaveBeenCalledTimes(1);
  });

  it('Should update one Experience from DB', async () => {
    const updatedExperience = await controller.updateExperience(
      createMock<UpdateExperienceDto>(),
    );
    expect(updatedExperience).toBeDefined();
    expect(fakeExperienceService.updateExperience).toHaveBeenCalledTimes(1);
  });

  it('Should delete one Experience from DB', async () => {
    const deletedEducation = await controller.deleteExperience('1');
    expect(deletedEducation).toBeDefined();
    expect(fakeExperienceService.deleteExperience).toHaveBeenCalledTimes(1);
  });
});
