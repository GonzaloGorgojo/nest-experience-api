/**
 * AppController unit test.
 *
 * @file   This file defines the Unit Tests for AppController Class.
 * @author Gonzalo Gorgojo.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return "Status ok"', () => {
    expect(appController.getHealth()).toBe('Status ok');
  });
});
