import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DanhmuckhachhangService } from './danhmuckhachhang.service';
import { InsertDanhMucKhachHangDTO, UpdateDanhMucKhachHangDTO } from './dto';

@Controller('danhmuckhachhang')
export class DanhmuckhachhangController {
    constructor(private danhmuckhachhangService: DanhmuckhachhangService){
    }
    @Get()
    getAll(){
        return this.danhmuckhachhangService.getAll()
    }
    @Get('bymachungtu/:makhachang')
    getDanhMucTaiKhoanBySoTaiKhoan(@Param('makhachang' )cMaKhachHang: string ){
        return this.danhmuckhachhangService.getDanhMucKhachHangByMaKhachHang(cMaKhachHang)
    }
    
    @Post('createkhachhang')
    createDanhMucTaiKhoan(@Body() insertKhachHangData: InsertDanhMucKhachHangDTO){
        return this.danhmuckhachhangService.createKhachHang(insertKhachHangData)
    }
    @Patch('update/:makhachhang')
    updatedKhachHang(
        @Body() _tDanhMucKhachHang : UpdateDanhMucKhachHangDTO,
        @Param('makhachhang') cMaKhachHang :string
    ){
        return this.danhmuckhachhangService.updateKhachHang(_tDanhMucKhachHang,cMaKhachHang)
    }
    @Delete('deletekhachhang/:makhachhang')
    deletedKhachHang(@Param('makhachhang') cMaKhachHang: string){
        return this.danhmuckhachhangService.deleteKhachHang(cMaKhachHang)
    }
}
