/**
 * Authentication module.
 *
 * Module for authentication functionality.
 *
 * @file   This file defines the AuthModule class.
 * @author Gonzalo Gorgojo.
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.APP_JWTSECRET,
        signOptions: { expiresIn: '60s' },
      }),
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
