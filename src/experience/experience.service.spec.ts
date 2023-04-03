import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceMapper } from 'src/mapper/experience.mapper';
import { DataSource } from 'typeorm';
import { CreateExperienceDto } from './dto/createExperience.dto';
import { UpdateExperienceDto } from './dto/updateExperience.dto';
import { ExperienceService } from './experience.service';
import { Experience } from './model/experience.entity';

const fakeDataSrc = {
  manager: {
    findOne: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    findBy: jest.fn(),
  },
};

describe('ExperienceService', () => {
  let service: ExperienceService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        ExperienceService,
        ExperienceMapper,
        { provide: DataSource, useValue: fakeDataSrc },
      ],
    }).compile();

    service = module.get<ExperienceService>(ExperienceService);
  });

  it('Should create one Experience', async () => {
    fakeDataSrc.manager.findOneBy.mockReturnValueOnce(createMock<Experience>());

    fakeDataSrc.manager.save.mockReturnValueOnce(createMock<Experience>());

    const createdExperience = await service.createExperience(
      createMock<CreateExperienceDto>(),
    );

    expect(createdExperience).toBeDefined();
    expect(fakeDataSrc.manager.findOneBy).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.save).toHaveBeenCalledTimes(1);
  });

  it('Should get all Experience from one User from DB', async () => {
    fakeDataSrc.manager.find.mockReturnValueOnce([createMock<Experience>()]);

    const allExperiences = await service.getExperience('1');

    expect(allExperiences).toBeDefined();
    expect(fakeDataSrc.manager.find).toHaveBeenCalledTimes(1);
  });

  it('Should update one Experience from DB', async () => {
    fakeDataSrc.manager.save.mockReturnValueOnce(createMock<Experience>());
    fakeDataSrc.manager.findBy.mockReturnValueOnce(createMock<Experience>());

    const updatedExperience = await service.updateExperience(
      createMock<UpdateExperienceDto>(),
    );

    expect(updatedExperience).toBeDefined();
    expect(fakeDataSrc.manager.findBy).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.save).toHaveBeenCalledTimes(1);
  });

  it('Should delete one Experience from DB', async () => {
    fakeDataSrc.manager.findOneBy.mockReturnValueOnce(createMock<Experience>());
    fakeDataSrc.manager.delete.mockReturnValueOnce({});

    const deletedExperience = await service.deleteExperience(1);

    expect(deletedExperience).toBeDefined();
    expect(fakeDataSrc.manager.delete).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.findOneBy).toHaveBeenCalledTimes(1);
  });
});
