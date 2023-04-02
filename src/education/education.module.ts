import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { MapperModule } from 'src/mapper/mapper.module';

@Module({
  imports: [MapperModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
