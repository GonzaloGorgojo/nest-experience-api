/**
 * UserMapperService class.
 *
 * @file   This file defines the UserMapperService, who manage all the mapping for user Service.
 * @author Gonzalo Gorgojo.
 */
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { AdminOutputDto } from '../user/dto/adminOutput.dto';
import { UpdateUserDto } from '../user/dto/updateUser.dto';
import { UserOutputDto } from '../user/dto/userOutput.dto';
import { Admin } from '../user/model/admin.entity';
import { User } from '../user/model/user.entity';

@Injectable()
export class UserMapperService {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
  ) {
    /** @type {User} => @type {UserOutputDto} */
    createMap(this.mapper, User, UserOutputDto);

    /** @type {Admin} => @type {AdminOutputDto} */
    createMap(this.mapper, Admin, AdminOutputDto);

    /** @type {UpdateUserDto} => @type {User} */
    createMap(
      this.mapper,
      UpdateUserDto,
      User,
      forMember(
        (d) => d.userId,
        mapFrom((s) => s.userId),
      ),
      forMember(
        (d) => d.firstName,
        mapFrom((s) => s.firstName),
      ),
      forMember(
        (d) => d.lastName,
        mapFrom((s) => s.lastName),
      ),
      forMember(
        (d) => d.email,
        mapFrom((s) => s.email),
      ),
      forMember(
        (d) => d.description,
        mapFrom((s) => s.description),
      ),
      forMember(
        (d) => d.country,
        mapFrom((s) => (s.country ? s.country : null)),
      ),
      forMember(
        (d) => d.linkedin,
        mapFrom((s) => (s.linkedin ? s.linkedin : null)),
      ),
      forMember(
        (d) => d.github,
        mapFrom((s) => (s.github ? s.github : null)),
      ),
      forMember(
        (d) => d.extraLink,
        mapFrom((s) => (s.extraLink ? s.extraLink : null)),
      ),
    );
  }

  /**
   * mapUserEntityToUserOutputDto.
   *
   * Maps User entity to the Output object.
   *
   * @param entity User entity to map.
   *
   * @return UserOutputDto mapped object..
   */
  mapUserEntityToUserOutputDto(entity: User): UserOutputDto {
    return this.mapper.map(entity, User, UserOutputDto);
  }

  /**
   * mapUserEntityArrayToUserOutputDtoArray.
   *
   * Maps User entity array to Output objects array.
   *
   * @param entity User entity array to map.
   *
   * @return UserOutputDto mapped objects..
   */
  mapUserEntityArrayToUserOutputDtoArray(entity: User[]): UserOutputDto[] {
    return this.mapper.mapArray(entity, User, UserOutputDto);
  }

  /**
   * mapAdminEntityToAdminOutputDto.
   *
   * Maps Admin entity to the Output object.
   *
   * @param entity Admin entity to map.
   *
   * @return AdminOutputDto mapped object.
   */
  mapAdminEntityToAdminOutputDto(entity: Admin): AdminOutputDto {
    return this.mapper.map(entity, Admin, AdminOutputDto);
  }

  /**
   * mapUpdateUserDtoToUserEntity.
   *
   * Maps Update user Dto to User entity.
   *
   * @param userToUpdate User dto to map.
   *
   * @return Admin entity mapped .
   */
  mapUpdateUserDtoToUserEntity(userToUpdate: UpdateUserDto): User {
    return this.mapper.map(userToUpdate, UpdateUserDto, User);
  }
}
