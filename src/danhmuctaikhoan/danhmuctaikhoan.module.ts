import { Module } from '@nestjs/common';
import { DanhmuctaikhoanService } from './danhmuctaikhoan.service';
import { DanhmuctaikhoanController } from './danhmuctaikhoan.controller';

@Module({
  providers: [DanhmuctaikhoanService],
  controllers: [DanhmuctaikhoanController]
})
export class DanhmuctaikhoanModule {}
