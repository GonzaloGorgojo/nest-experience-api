/**
 * LoginOutput.
 *
 * DTO for login token output.
 *
 * @file   This file defines the login Output DTO.
 * @author Gonzalo Gorgojo.
 */

import { ApiProperty } from '@nestjs/swagger';

/**
 * Class Summary
 *
 * Output for the login step.
 *
 *
 * @class LoginOutput
 */

export class LoginOutput {
  @ApiProperty({
    description: 'will be the token for the session',
    type: String,
    example: 'Akasdj213',
  })
  accessToken: string;
}
