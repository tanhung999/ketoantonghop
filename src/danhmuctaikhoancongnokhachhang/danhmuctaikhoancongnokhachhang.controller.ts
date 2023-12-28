import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DanhmuctaikhoancongnokhachhangService } from './danhmuctaikhoancongnokhachhang.service';
import { InsertTaiKhoanCongNoKhachHangDTO, UpdateTaiKhoanCongNoKhachHangDTO } from './dto';
@Controller('danhmuctaikhoancongnokhachhang')
export class DanhmuctaikhoancongnokhachhangController {
    constructor (private danhmuctaikhoancongnokhachhangService: DanhmuctaikhoancongnokhachhangService){}
    @Get()
    getAll(){
        return this.danhmuctaikhoancongnokhachhangService.getAll()
    }
    @Get('bymachungtu/:cMaKhachHang/:cTaiKhoan')
    getDanhMucKhachHangByMaKhachHang(
        @Param('cMaKhachHang') cMaKhachHang: string,
        @Param('cTaiKhoan') cTaiKhoan: string,
    ) {
        return this.danhmuctaikhoancongnokhachhangService.getDanhMucKhachHangByMaKhachHang(cMaKhachHang,cTaiKhoan)
    }
    @Post('createtaikhoancongno')
    createdTaiKhoanCongNo(
        @Body() insertTaiKhoanCongNoKhachHangData : InsertTaiKhoanCongNoKhachHangDTO
    ){
        return this.danhmuctaikhoancongnokhachhangService.createDanhMucTaiKhoanCongNoKhachHang(insertTaiKhoanCongNoKhachHangData)
    }
    @Patch('update/:cMaKhachHang/:cTaiKhoan')
    updateTaiKhoanCongNo(
        @Body() _tDanhMucTaiKhoanCongNoKhachHang : UpdateTaiKhoanCongNoKhachHangDTO,
        @Param('cMaKhachHang') cMaKhachHang:string,
        @Param('cTaiKhoan') cTaiKhoan:string
    ) {
        return this.danhmuctaikhoancongnokhachhangService.updateDanhMucTaiKhoanCongNoKhachHang(_tDanhMucTaiKhoanCongNoKhachHang,cMaKhachHang,cTaiKhoan)
        // kiểm tra lại chổ này 
        // a viết nhầm lúc nãy là return this.updateTaiKhoanCongNo(updateTaiKhoanCongNoData,cMaKhachHang,cTaiKhoan)
        // => sửa lại thành như trên
    }
    @Delete('deletetaikhoancongno')
    deletedTaiKhoanCongNo(
        @Param('cMaKhachHang') cMaKhachHang: string,
        @Param('cTaiKhoan') cTaiKhoan: string,
    ){
        return this.danhmuctaikhoancongnokhachhangService.deleteTaiKhoanCongNo(cMaKhachHang,cTaiKhoan)
    }
}
