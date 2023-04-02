import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { CreateEducationDto } from './dto/createEducation.dto';
import { EducationOutputDto } from './dto/educationOutput.dto';
import { UpdateEducationDto } from './dto/updateEducation.dto';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';

describe('EducationController', () => {
  let controller: EducationController;

  const fakeDataSrc: Partial<DataSource> = {};
  const fakeEducationService: Partial<EducationService> = {
    createEducation: jest
      .fn()
      .mockReturnValue(createMock<EducationOutputDto>()),
    getEducation: jest.fn().mockReturnValue([createMock<EducationOutputDto>()]),
    updateEducation: jest
      .fn()
      .mockReturnValue(createMock<EducationOutputDto>()),
    deleteEducation: jest.fn().mockReturnValue(''),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationController],
      providers: [
        { provide: EducationService, useValue: fakeEducationService },
        {
          provide: DataSource,
          useValue: fakeDataSrc,
        },
      ],
    }).compile();

    controller = module.get<EducationController>(EducationController);
  });

  it('Should create one Education', async () => {
    const createdEducation = await controller.createEducation(
      createMock<CreateEducationDto>(),
    );
    expect(createdEducation).toBeDefined();
    expect(fakeEducationService.createEducation).toHaveBeenCalledTimes(1);
  });

  it('Should get all Education from one User from DB', async () => {
    const allEducation = await controller.getEducation('1');
    expect(allEducation).toBeDefined();
    expect(fakeEducationService.getEducation).toHaveBeenCalledTimes(1);
  });

  it('Should update one Education from DB', async () => {
    const updatedEducation = await controller.updateEducation(
      createMock<UpdateEducationDto>(),
    );
    expect(updatedEducation).toBeDefined();
    expect(fakeEducationService.updateEducation).toHaveBeenCalledTimes(1);
  });

  it('Should delete one Education from DB', async () => {
    const deletedEducation = await controller.deleteEducation('1');
    expect(deletedEducation).toBeDefined();
    expect(fakeEducationService.deleteEducation).toHaveBeenCalledTimes(1);
  });
});
