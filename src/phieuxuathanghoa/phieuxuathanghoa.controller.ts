import { Controller,Get, Param } from '@nestjs/common';
import { PhieuxuathanghoaService } from './phieuxuathanghoa.service';

@Controller('phieuxuathanghoa')
export class PhieuxuathanghoaController {
    constructor (private phieuXuatHangHoaService: PhieuxuathanghoaService) {}
    @Get()
    getAll(){
        return this.phieuXuatHangHoaService.getAll()
    }
    @Get(':sochungtu')
    getPhieuXuatHangHoaBySoChungTu (@Param('sochungtu') soChungTu: string){
        return this.phieuXuatHangHoaService.getPhieuXuatHangHoaBySoChungTu(soChungTu)
    }
    
}
