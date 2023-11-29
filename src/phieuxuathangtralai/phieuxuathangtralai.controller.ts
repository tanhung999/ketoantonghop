import { Controller,Get, Param } from '@nestjs/common';
import { PhieuxuathangtralaiService } from './phieuxuathangtralai.service';

@Controller('phieuxuathangtralai')
export class PhieuxuathangtralaiController {
    constructor (private phieuXuatHangTraLaiService: PhieuxuathangtralaiService){}
    @Get()
    getAll(){
        return this.phieuXuatHangTraLaiService.getAll()
    }
    @Get(':/bysochungtu/:sochungtu')
    getPhieuXuatHangTraLaiBySoChungTu(@Param('sochungtu')soChungTu: string){
        return this.phieuXuatHangTraLaiService.getPhieuXuatHangTraLaiBySoChungTu(soChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuXuatHangTraLaiService.soChungTuGhiSoNext()
    }
    @Get('hanghoatralai')
    getHangHoaTraLai(){
        return this.phieuXuatHangTraLaiService.hangHoaTraLai()
    }
}
