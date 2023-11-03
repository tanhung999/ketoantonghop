import { Module } from '@nestjs/common';
import { PhieuchichitietController } from './phieuchichitiet.controller';
import { PhieuchichitietService } from './phieuchichitiet.service';

@Module({
  controllers: [PhieuchichitietController],
  providers: [PhieuchichitietService],
  exports: [PhieuchichitietService]
})
export class PhieuchichitietModule {}
