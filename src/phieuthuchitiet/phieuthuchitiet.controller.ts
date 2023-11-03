import { Controller, Get, Param } from '@nestjs/common';
import { PhieuthuchitietService } from './phieuthuchitiet.service';

@Controller('phieuthuchitiet')
export class PhieuthuchitietController {
    constructor(private phieuThuChiTietService: PhieuthuchitietService){}
    @Get()
    getAll(){
        return this.phieuThuChiTietService.getAll()
    }
    @Get(':sochungtu')
    getPhieuThuBySoChungTu(@Param('sochungtu') soChungTu: string) {
        return this.phieuThuChiTietService.getPhieuThuBySoChungTu(soChungTu)
    }
}
