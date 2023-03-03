/**
 * UserModule class.
 *
 * @file   This file defines the UserModule.
 * @author Gonzalo Gorgojo.
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MapperModule } from '../mapper/mapper.module';

@Module({
  imports: [MapperModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
