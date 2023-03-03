/**
 * AppModule.
 *
 * @file   This file defines the AppModule Class.
 * @author Gonzalo Gorgojo.
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ExperienceModule } from './experience/experience.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperModule } from './mapper/mapper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TerminusModule,
    HttpModule,
    ExperienceModule,
    DatabaseModule,
    UserModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    MapperModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
