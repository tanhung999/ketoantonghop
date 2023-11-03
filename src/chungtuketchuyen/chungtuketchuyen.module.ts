import { Module } from '@nestjs/common';
import { ChungtuketchuyenService } from './chungtuketchuyen.service';
import { ChungtuketchuyenController } from './chungtuketchuyen.controller';

@Module({
  providers: [ChungtuketchuyenService],
  controllers: [ChungtuketchuyenController]
})
export class ChungtuketchuyenModule {}
