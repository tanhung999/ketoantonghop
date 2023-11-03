import { Module } from '@nestjs/common';
import { PhieunhaphanghoaService } from './phieunhaphanghoa.service';
import { PhieunhaphanghoaController } from './phieunhaphanghoa.controller';

@Module({
  providers: [PhieunhaphanghoaService],
  controllers: [PhieunhaphanghoaController],
  exports: [PhieunhaphanghoaService]
})
export class PhieunhaphanghoaModule {}
