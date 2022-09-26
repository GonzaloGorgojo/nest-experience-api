/**
 * Login DTO.
 *
 * DTO for login.
 *
 * @file   This file defines the login DTO.
 * @author Gonzalo Gorgojo.
 */
import { IsString } from 'class-validator';

/**
 * Class Summary
 *
 * DTO for first login step.
 *
 * @class LoginDto
 */
export class LoginDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
