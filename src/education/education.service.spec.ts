import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { EducationMapper } from 'src/mapper/education.mapper';
import { DataSource } from 'typeorm';
import { CreateEducationDto } from './dto/createEducation.dto';
import { UpdateEducationDto } from './dto/updateEducation.dto';
import { EducationService } from './education.service';
import { Education } from './model/education.entity';

describe('EducationService', () => {
  let service: EducationService;

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

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        EducationService,
        EducationMapper,
        { provide: DataSource, useValue: fakeDataSrc },
      ],
    }).compile();

    service = module.get<EducationService>(EducationService);
  });

  it('Should create one Education', async () => {
    fakeDataSrc.manager.findOneBy.mockReturnValueOnce(createMock<Education>());

    fakeDataSrc.manager.save.mockReturnValueOnce(createMock<Education>());

    const createdEducation = await service.createEducation(
      createMock<CreateEducationDto>(),
    );

    expect(createdEducation).toBeDefined();
    expect(fakeDataSrc.manager.findOneBy).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.save).toHaveBeenCalledTimes(1);
  });

  it('Should get all Education from one User from DB', async () => {
    fakeDataSrc.manager.find.mockReturnValueOnce([createMock<Education>()]);

    const allEducation = await service.getEducation('1');

    expect(allEducation).toBeDefined();
    expect(fakeDataSrc.manager.find).toHaveBeenCalledTimes(1);
  });

  it('Should update one Education from DB', async () => {
    fakeDataSrc.manager.save.mockReturnValueOnce(createMock<Education>());
    fakeDataSrc.manager.findBy.mockReturnValueOnce(createMock<Education>());

    const updatedEducation = await service.updateEducation(
      createMock<UpdateEducationDto>(),
    );

    expect(updatedEducation).toBeDefined();
    expect(fakeDataSrc.manager.findBy).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.save).toHaveBeenCalledTimes(1);
  });

  it('Should delete one Education from DB', async () => {
    fakeDataSrc.manager.findOneBy.mockReturnValueOnce(createMock<Education>());
    fakeDataSrc.manager.delete.mockReturnValueOnce({});

    const deletedEducation = await service.deleteEducation(1);

    expect(deletedEducation).toBeDefined();
    expect(fakeDataSrc.manager.delete).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.findOneBy).toHaveBeenCalledTimes(1);
  });
});
