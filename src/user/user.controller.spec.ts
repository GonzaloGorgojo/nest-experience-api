import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AdminOutputDto } from './dto/adminOutput.dto';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserOutputDto } from './dto/userOutput.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const fakeDataSrc: Partial<DataSource> = {};
  const fakeUserService: Partial<UserService> = {
    createUser: jest.fn().mockReturnValue(createMock<UserOutputDto>()),
    createAdminUser: jest.fn().mockReturnValue(createMock<AdminOutputDto>()),
    getAllUser: jest.fn().mockReturnValue([createMock<UserOutputDto>()]),
    getOneUser: jest.fn().mockReturnValue(createMock<UserOutputDto>()),
    updateOneUser: jest.fn().mockReturnValue(createMock<UserOutputDto>()),
    deleteOneUser: jest.fn().mockReturnValue(''),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        {
          provide: DataSource,
          useValue: fakeDataSrc,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('Should create one User', async () => {
    const createdUser = await controller.createUser(
      createMock<CreateUserDto>(),
    );
    expect(createdUser).toBeDefined();
    expect(fakeUserService.createUser).toHaveBeenCalledTimes(1);
  });

  it('Should create one Admin User', async () => {
    const createdAdmin = await controller.createAdminUser(
      createMock<CreateAdminDto>(),
    );
    expect(createdAdmin).toBeDefined();
    expect(fakeUserService.createAdminUser).toHaveBeenCalledTimes(1);
  });

  it('Should get all users from DB', async () => {
    const allUsers = await controller.getAllUsers();
    expect(allUsers).toBeDefined();
    expect(fakeUserService.getAllUser).toHaveBeenCalledTimes(1);
  });

  it('Should get one user from DB', async () => {
    const oneUser = await controller.getuser('test@gmail.com');
    expect(oneUser).toBeDefined();
    expect(fakeUserService.getOneUser).toHaveBeenCalledTimes(1);
  });

  it('Should update one user from DB', async () => {
    const updatedUser = await controller.updateUser(
      createMock<UpdateUserDto>(),
    );
    expect(updatedUser).toBeDefined();
    expect(fakeUserService.updateOneUser).toHaveBeenCalledTimes(1);
  });

  it('Should delete one user from DB', async () => {
    const deletedUser = await controller.deleteUser('test@gmail.com');
    expect(deletedUser).toBeDefined();
    expect(fakeUserService.deleteOneUser).toHaveBeenCalledTimes(1);
  });
});
