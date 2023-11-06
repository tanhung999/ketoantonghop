import { Controller, Get, Param } from '@nestjs/common';
import { PhieunhaphangtralaiService } from './phieunhaphangtralai.service';

@Controller('phieunhaphangtralai')
export class PhieunhaphangtralaiController {
    constructor (private phieuNhapHangTraLaiService: PhieunhaphangtralaiService){}
    @Get()
    getAll(){
        return this.phieuNhapHangTraLaiService.getAll()
    }
    @Get('/bysochungtu/:sochungtu')
    getPhieuNhapHangHoaTraLaiBySoChungTu(@Param('sochungtu') soChungTu: string ){
        return this.phieuNhapHangTraLaiService.getPhieuNhapHangTraLaiBySoChungTu(soChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuNhapHangTraLaiService.soChungTuGhiSoNext()
    }
}
