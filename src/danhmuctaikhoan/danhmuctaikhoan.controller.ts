import { Controller, Get, Param } from '@nestjs/common';
import { DanhmuctaikhoanService } from './danhmuctaikhoan.service';

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

}
