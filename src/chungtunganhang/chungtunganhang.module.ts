import { Module } from '@nestjs/common';
import { ChungtunganhangController } from './chungtunganhang.controller';
import { ChungtunganhangService } from './chungtunganhang.service';

@Module({
  controllers: [ChungtunganhangController],
  providers: [ChungtunganhangService],
  exports: [ChungtunganhangService]
})
export class ChungtunganhangModule {}
