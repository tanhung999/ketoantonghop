import { Controller,Get, Param } from '@nestjs/common';
import { ChungtuketchuyenService } from './chungtuketchuyen.service';

@Controller('chungtuketchuyen')
export class ChungtuketchuyenController {
    constructor (private chungTuKetChuyenService: ChungtuketchuyenService){}
    @Get()
    getAll(){
        return this.chungTuKetChuyenService.getAll()
    }
    @Get('/bysochungtu/:sochungtu')
    getChungTuKetChuyenByMaChungTu(@Param('sochungtu') maChungTu: string){
        return this.chungTuKetChuyenService.getChungTuKetChuyenByMaChungTu(maChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.chungTuKetChuyenService.soChungTuGhiSoNext()
    }
}
