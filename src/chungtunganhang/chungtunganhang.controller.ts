import { Controller, Get, Param } from '@nestjs/common';
import { ChungtunganhangService } from './chungtunganhang.service';

@Controller('chungtunganhang')
export class ChungtunganhangController {
    constructor (private chungTuNganHangService: ChungtunganhangService){}
    @Get()
    getAll (){
        return this.chungTuNganHangService.getAll()
    }
    @Get(':sochungtu')
    getChungTuNganHangBySoChungTu(@Param('sochungtu') soChungTu: string ){
        return this.chungTuNganHangService.getChungTuNganHangBySoChungTu(soChungTu)
    }
}
