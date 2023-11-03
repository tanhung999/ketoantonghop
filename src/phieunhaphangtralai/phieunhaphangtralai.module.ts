import { Module } from '@nestjs/common';
import { PhieunhaphangtralaiService } from './phieunhaphangtralai.service';
import { PhieunhaphangtralaiController } from './phieunhaphangtralai.controller';

@Module({
  providers: [PhieunhaphangtralaiService],
  controllers: [PhieunhaphangtralaiController],
  exports: [PhieunhaphangtralaiService]
})
export class PhieunhaphangtralaiModule {}
