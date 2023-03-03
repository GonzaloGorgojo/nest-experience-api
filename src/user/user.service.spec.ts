/**
 * UserService unit test.
 *
 * @file   This file defines the UserService unit test.
 * @author Gonzalo Gorgojo.
 */
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { UserMapperService } from '../mapper/userMapper.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Admin } from './model/admin.entity';
import { User } from './model/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const fakeDataSrc = {
    manager: {
      findOne: jest.fn(),
      delete: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
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
        UserService,
        UserMapperService,
        { provide: DataSource, useValue: fakeDataSrc },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Should create one User', async () => {
    fakeDataSrc.manager.save.mockReturnValueOnce(createMock<User>());

    const createdUser = await service.createUser(createMock<CreateUserDto>());

    expect(createdUser).toBeDefined();
    expect(fakeDataSrc.manager.findOne).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.save).toHaveBeenCalledTimes(1);
  });

  it('Should create one Admin User', async () => {
    fakeDataSrc.manager.save.mockReturnValueOnce(createMock<Admin>());

    const createdAdmin = await service.createAdminUser(
      createMock<CreateAdminDto>({ password: 'fakepassword' }),
    );

    expect(createdAdmin).toBeDefined();
    expect(fakeDataSrc.manager.findOne).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.save).toHaveBeenCalledTimes(1);
  });

  it('Should get all Users from DB', async () => {
    fakeDataSrc.manager.find.mockReturnValueOnce([createMock<User>()]);

    const allUsers = await service.getAllUser();

    expect(allUsers).toBeDefined();
    expect(fakeDataSrc.manager.find).toHaveBeenCalledTimes(1);
  });

  it('Should get one User from DB', async () => {
    fakeDataSrc.manager.findOneBy.mockReturnValueOnce(createMock<User>());

    const oneUser = await service.getOneUser('test@gmail.com');

    expect(oneUser).toBeDefined();
    expect(fakeDataSrc.manager.findOneBy).toHaveBeenCalledTimes(1);
  });

  it('Should update one User from DB', async () => {
    fakeDataSrc.manager.save.mockReturnValueOnce(createMock<User>());
    fakeDataSrc.manager.findOneBy.mockReturnValueOnce(createMock<User>());

    const updatedUser = await service.updateOneUser(
      createMock<UpdateUserDto>(),
    );

    expect(updatedUser).toBeDefined();
    expect(fakeDataSrc.manager.findOneBy).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.save).toHaveBeenCalledTimes(1);
  });

  it('Should delete one User from DB', async () => {
    fakeDataSrc.manager.findOneBy.mockReturnValueOnce(createMock<User>());
    fakeDataSrc.manager.delete.mockReturnValueOnce({});

    const deletedUser = await service.deleteOneUser('test@gmail.com');

    expect(deletedUser).toBeDefined();
    expect(fakeDataSrc.manager.delete).toHaveBeenCalledTimes(1);
    expect(fakeDataSrc.manager.findOneBy).toHaveBeenCalledTimes(1);
  });
});
