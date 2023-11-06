import { Controller, Get, Param } from '@nestjs/common';
import { ChungtunganhangService } from './chungtunganhang.service';

@Controller('chungtunganhang')
export class ChungtunganhangController {
    constructor (private chungTuNganHangService: ChungtunganhangService){}
    @Get()
    getAll (){
        return this.chungTuNganHangService.getAll()
    }
    @Get('/bysochungtu/:sochungtu')
    getChungTuNganHangBySoChungTu(@Param('sochungtu') soChungTu: string ){
        return this.chungTuNganHangService.getChungTuNganHangBySoChungTu(soChungTu)
    }

    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.chungTuNganHangService.soChungTuGhiSoNext()
    }
}
