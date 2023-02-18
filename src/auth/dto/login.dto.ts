/**
 * Login DTO.
 *
 * DTO for login.
 *
 * @file   This file defines the login DTO.
 * @author Gonzalo Gorgojo.
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Class Summary
 *
 * DTO for first login step.
 *
 * @class LoginDto
 */
export class LoginDto {
  @ApiProperty({
    description: 'already created admin user',
    type: String,
    example: 'superUser',
  })
  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  username: string;

  @ApiProperty({ type: String, example: 'superPassword' })
  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
