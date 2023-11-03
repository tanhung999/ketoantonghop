import { Module } from '@nestjs/common';
import { PhieuxuathanghoaController } from './phieuxuathanghoa.controller';
import { PhieuxuathanghoaService } from './phieuxuathanghoa.service';

@Module({
  controllers: [PhieuxuathanghoaController],
  providers: [PhieuxuathanghoaService],
  exports: [PhieuxuathanghoaService]
})
export class PhieuxuathanghoaModule {}
