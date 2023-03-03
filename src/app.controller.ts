/**
 * AppController.
 *
 * @file   This file defines the AppController Class, user for general purposes.
 * @author Gonzalo Gorgojo.
 */
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealth(): string {
    return 'Status ok';
  }
}
