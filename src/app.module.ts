import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TerminusModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'portfolio.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
      migrationsTransactionMode: 'all',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
