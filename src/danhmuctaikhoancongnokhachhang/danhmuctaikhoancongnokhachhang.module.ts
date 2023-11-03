import { Module } from '@nestjs/common';
import { DanhmuctaikhoancongnokhachhangController } from './danhmuctaikhoancongnokhachhang.controller';
import { DanhmuctaikhoancongnokhachhangService } from './danhmuctaikhoancongnokhachhang.service';

@Module({
  controllers: [DanhmuctaikhoancongnokhachhangController],
  providers: [DanhmuctaikhoancongnokhachhangService]
})
export class DanhmuctaikhoancongnokhachhangModule {}
