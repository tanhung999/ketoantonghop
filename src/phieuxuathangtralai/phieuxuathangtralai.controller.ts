import { Controller,Get, Param } from '@nestjs/common';
import { PhieuxuathangtralaiService } from './phieuxuathangtralai.service';

@Controller('phieuxuathangtralai')
export class PhieuxuathangtralaiController {
    constructor (private phieuXuatHangTraLaiService: PhieuxuathangtralaiService){}
    @Get()
    getAll(){
        return this.phieuXuatHangTraLaiService.getAll()
    }
    @Get(':sochungtu')
    getPhieuXuatHangTraLaiBySoChungTu(@Param('sochungtu')soChungTu: string){
        return this.phieuXuatHangTraLaiService.getPhieuXuatHangTraLaiBySoChungTu(soChungTu)
    }
}
