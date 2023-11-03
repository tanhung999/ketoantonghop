import { Controller, Get, Param } from '@nestjs/common';
import { PhieuchichitietService } from './phieuchichitiet.service';

@Controller('phieuchichitiet')
export class PhieuchichitietController {
    constructor (private phieuChiChiTietService: PhieuchichitietService){}
    @Get()
    getAll(){
        return this.phieuChiChiTietService.getAll()
    }
    @Get(':sochungtu')
    getPhieuChiBySoChungTu(@Param('sochungtu') soChungTu: string){
        return this.phieuChiChiTietService.getPhieuChiBySoChungTu(soChungTu)
    }
    
}
