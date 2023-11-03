import { Module } from '@nestjs/common';
import { DanhmuchanghoaService } from './danhmuchanghoa.service';
import { DanhmuchanghoaController } from './danhmuchanghoa.controller';

@Module({
  providers: [DanhmuchanghoaService],
  controllers: [DanhmuchanghoaController]
})
export class DanhmuchanghoaModule {}
