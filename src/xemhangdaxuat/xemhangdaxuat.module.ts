import { Module } from '@nestjs/common';
import { XemhangdaxuatController } from './xemhangdaxuat.controller';
import { XemhangdaxuatService } from './xemhangdaxuat.service';
import { PhieuxuathanghoaModule } from '../phieuxuathanghoa/phieuxuathanghoa.module';
import { PhieuxuathangtralaiModule } from '../phieuxuathangtralai/phieuxuathangtralai.module';

@Module({
  controllers: [XemhangdaxuatController],
  providers: [XemhangdaxuatService],
  imports: [PhieuxuathanghoaModule,PhieuxuathangtralaiModule],
  exports: [XemhangdaxuatService]
})
export class XemhangdaxuatModule {}
