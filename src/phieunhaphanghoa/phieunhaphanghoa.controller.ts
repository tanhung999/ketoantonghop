import { Controller, Get, Param } from '@nestjs/common';
import { PhieunhaphanghoaService } from './phieunhaphanghoa.service';

@Controller('phieunhaphanghoa')
export class PhieunhaphanghoaController {
    constructor (private phieuNhapHangHoaService: PhieunhaphanghoaService){}
    @Get()
    getAll(){
        return this.phieuNhapHangHoaService.getAll()
    }
    @Get(':sochungtu')
    getPhieuNhapHangHoaBySoChungTu(@Param('sochungtu') soChungTu: string){
        return this.phieuNhapHangHoaService.getPhieuNhapHangHoaBySoChungTu(soChungTu)
    }
}
