import { Module } from '@nestjs/common';
import { PhieuxuathangtralaiService } from './phieuxuathangtralai.service';
import { PhieuxuathangtralaiController } from './phieuxuathangtralai.controller';

@Module({
  providers: [PhieuxuathangtralaiService],
  controllers: [PhieuxuathangtralaiController],
  exports: [PhieuxuathangtralaiService]
})
export class PhieuxuathangtralaiModule {}
