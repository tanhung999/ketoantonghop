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
    @Get('bymakhachhang/:makhachang')
    getDanhMucTaiKhoanBySoTaiKhoan(@Param('makhachang' )cMaKhachHang: string ){
        return this.danhmuckhachhangService.getDanhMucKhachHangByMaKhachHang(cMaKhachHang)
    }
    
    @Post('createkhachhang')
    createDanhMucTaiKhoan(@Body() insertKhachHangData: InsertDanhMucKhachHangDTO){
        return this.danhmuckhachhangService.createKhachHang(insertKhachHangData)
    }
    @Patch('updatekhachhang/:makhachhang')
    updatedKhachHang(
        @Body() updateKhachHangData : UpdateDanhMucKhachHangDTO,
        @Param('makhachhang') cMaKhachHang :string
    ){
        return this.danhmuckhachhangService.updateKhachHang(updateKhachHangData,cMaKhachHang)
    }
    @Delete('deletekhachhang/:makhachhang')
    deletedKhachHang(@Param('makhachhang') cMaKhachHang: string){
        return this.danhmuckhachhangService.deleteKhachHang(cMaKhachHang)
    }
}
