import { Controller, Get, Param } from '@nestjs/common';
import { DanhmuctaikhoancongnokhachhangService } from './danhmuctaikhoancongnokhachhang.service';
@Controller('danhmuctaikhoancongnokhachhang')
export class DanhmuctaikhoancongnokhachhangController {
    constructor (private danhmuctaikhoancongnokhachhangService: DanhmuctaikhoancongnokhachhangService){}
    @Get()
    getAll(){
        return this.danhmuctaikhoancongnokhachhangService.getAll()
    }
    @Get(':makhachhang')
    getDanhMucKhachHangByMaKhachHang(@Param('makhachhang') maKhachHang: string) {
        return this.danhmuctaikhoancongnokhachhangService.getDanhMucKhachHangByMaKhachHang(maKhachHang)
    }
}
