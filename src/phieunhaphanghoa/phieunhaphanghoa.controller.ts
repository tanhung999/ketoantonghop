import { Controller, Get, Param } from '@nestjs/common';
import { PhieunhaphanghoaService } from './phieunhaphanghoa.service';

@Controller('phieunhaphanghoa')
export class PhieunhaphanghoaController {
    constructor (private phieuNhapHangHoaService: PhieunhaphanghoaService){}
    @Get()
    getAll(){
        return this.phieuNhapHangHoaService.getAll()
    }
    @Get('/bymachungtu/:machungtu')
    getPhieuNhapHangHoaBySoChungTu(@Param('machungtu') maChungTu: string){
        return this.phieuNhapHangHoaService.getPhieuNhapHangHoaByMaChungTu(maChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuNhapHangHoaService.soChungTuGhiSoNext()
    }
    
}
