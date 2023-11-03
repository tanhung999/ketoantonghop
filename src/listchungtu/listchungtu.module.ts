import { Module } from '@nestjs/common';
import { ListchungtuController } from './listchungtu.controller';
import { ListchungtuService } from './listchungtu.service';
import { PhieuchichitietModule } from '../phieuchichitiet/phieuchichitiet.module';
import { PhieuthuchitietModule } from '../phieuthuchitiet/phieuthuchitiet.module';
import { ChungtughisoModule } from '../chungtughiso/chungtughiso.module';
import { ChungtunganhangModule } from '../chungtunganhang/chungtunganhang.module';
import { PhieunhaphanghoaModule } from '../phieunhaphanghoa/phieunhaphanghoa.module';
import { PhieuxuathanghoaModule } from '../phieuxuathanghoa/phieuxuathanghoa.module';
import { PhieunhaphangtralaiModule } from '../phieunhaphangtralai/phieunhaphangtralai.module';
import { PhieuxuathangtralaiModule } from '../phieuxuathangtralai/phieuxuathangtralai.module';

@Module({
  controllers: [ListchungtuController],
  providers: [ListchungtuService],
  imports: [
            PhieuchichitietModule,
            PhieuthuchitietModule,
            ChungtughisoModule,
            ChungtunganhangModule,
            PhieunhaphanghoaModule,
            PhieuxuathanghoaModule,
            PhieunhaphangtralaiModule,
            PhieuxuathangtralaiModule
          ]

})
export class ListchungtuModule {}
