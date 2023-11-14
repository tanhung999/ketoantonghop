import { Controller,Get, Param } from '@nestjs/common';
import { PhieuxuathanghoaService } from './phieuxuathanghoa.service';

@Controller('phieuxuathanghoa')
export class PhieuxuathanghoaController {
    constructor (private phieuXuatHangHoaService: PhieuxuathanghoaService) {}
    @Get()
    getAll(){
        return this.phieuXuatHangHoaService.getAll()
    }
    @Get('/bysochungtu/:sochungtu')
    getPhieuXuatHangHoaBySoChungTu (@Param('sochungtu') soChungTu: string){
        return this.phieuXuatHangHoaService.getPhieuXuatHangHoaBySoChungTu(soChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuXuatHangHoaService.soChungTuGhiSoNext()
    }
    @Get('hangdaxuat')
    getHangDAXuat (){
        return this.phieuXuatHangHoaService.hangHoaDaXuat()
    }
}
