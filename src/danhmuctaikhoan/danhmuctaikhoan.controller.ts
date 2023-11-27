import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DanhmuctaikhoanService } from './danhmuctaikhoan.service';
import { InsertDanhMucTaiKhoanDTO, UpdateDanhMucTaiKhoanDTO } from './dto';

@Controller('danhmuctaikhoan')
export class DanhmuctaikhoanController {
    constructor(private danhmuctaikhoanService: DanhmuctaikhoanService){
    }
    @Get()
    getAll(){
        return this.danhmuctaikhoanService.getAll()
    }
    @Get(':taikhoan')
    getDanhMucTaiKhoanBySoTaiKhoan(@Param('taikhoan' )soTaiKhoan: string ){
        return this.danhmuctaikhoanService.getDanhMucTaiKhoanBySoTaiKhoan(soTaiKhoan)
    }
    @Post('createtaikhoan')
    createDanhMucTaiKhoan(@Body() insertTaiKhoanData: InsertDanhMucTaiKhoanDTO){
        return this.danhmuctaikhoanService.createTaiKhoan(insertTaiKhoanData)
    }
    @Patch('updatetaikhoan/:taikhoan')
    updatedTaiKhoan(
        @Body() updateTaiKhoanData : UpdateDanhMucTaiKhoanDTO,
        @Param('taikhoan') taiKhoan :string
    ){
        return this.danhmuctaikhoanService.updateTaiKhoan(updateTaiKhoanData,taiKhoan)
    }
    @Delete('deleteTaiKhoan/:taikhoan')
    deletedTaiKhoan(@Param('taikhoan') taikhoan: string){
        return this.danhmuctaikhoanService.deleteTaiKhoan(taikhoan)
    }
}
