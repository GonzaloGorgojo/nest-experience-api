/**
 * MapperModule class.
 *
 * @file   This file defines the MapperModule.
 * @author Gonzalo Gorgojo.
 */
import { Module } from '@nestjs/common';
import { UserMapperService } from './userMapper.service';

@Module({
  providers: [UserMapperService],
  exports: [UserMapperService],
})
export class MapperModule {}
