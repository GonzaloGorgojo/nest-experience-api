/**
 * JwtAuthGuard Guard.
 *
 * Handles the main authentication logic. Using the jwt custom strategy, this recieve a signed JWT
 * and validate its expiration, its payload and his sign key or secret.
 *
 * @file   This file defines the JwtAuthGuard.
 * @author Gonzalo Gorgojo.
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/**
 * Class Summary
 *
 * Guard implementation for JwtAuthGuard guard.
 *
 * @class JwtAuthGuard
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}
