import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DanhmuctaikhoanModule } from './danhmuctaikhoan/danhmuctaikhoan.module';
import { DanhmuchanghoaModule } from './danhmuchanghoa/danhmuchanghoa.module';
import { DanhmuctaikhoancongnokhachhangModule } from './danhmuctaikhoancongnokhachhang/danhmuctaikhoancongnokhachhang.module';
import { PhieuthuchitietModule } from './phieuthuchitiet/phieuthuchitiet.module';
import { PhieuchichitietModule } from './phieuchichitiet/phieuchichitiet.module';
import { PhieunhaphanghoaModule } from './phieunhaphanghoa/phieunhaphanghoa.module';
import { PhieuxuathanghoaModule } from './phieuxuathanghoa/phieuxuathanghoa.module';
import { ChungtughisoModule } from './chungtughiso/chungtughiso.module';
import { ChungtunganhangModule } from './chungtunganhang/chungtunganhang.module';
import { ChungtuketchuyenModule } from './chungtuketchuyen/chungtuketchuyen.module';
import { PhieunhaphangtralaiModule } from './phieunhaphangtralai/phieunhaphangtralai.module';
import { PhieuxuathangtralaiModule } from './phieuxuathangtralai/phieuxuathangtralai.module';
import { ListchungtuModule } from './listchungtu/listchungtu.module';
import { XemhangtondanhapModule } from './xemhangtondanhap/xemhangtondanhap.module';
import { XemhangdaxuatModule } from './xemhangdaxuat/xemhangdaxuat.module';



@Module({
  imports: [AuthModule, 
            UserModule, 
            PrismaModule,
            DanhmuctaikhoanModule,
            DanhmuchanghoaModule,
            DanhmuctaikhoancongnokhachhangModule,
            PhieuthuchitietModule,
            PhieuchichitietModule,
            PhieunhaphanghoaModule,
            PhieuxuathanghoaModule,
            ChungtughisoModule,
            ChungtunganhangModule,
            ChungtuketchuyenModule,
            PhieunhaphangtralaiModule,
            PhieuxuathangtralaiModule,
            ListchungtuModule,
            XemhangtondanhapModule,
            XemhangdaxuatModule, 
          ]
})
export class AppModule {}
