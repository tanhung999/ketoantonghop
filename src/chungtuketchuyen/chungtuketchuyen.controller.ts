import { Controller,Get, Param, Post } from '@nestjs/common';
import { ChungtuketchuyenService } from './chungtuketchuyen.service';

@Controller('chungtuketchuyen')
export class ChungtuketchuyenController {
    constructor (private chungTuKetChuyenService: ChungtuketchuyenService){}
    @Get()
    getAll(){
        return this.chungTuKetChuyenService.getAll()
    }
    @Get('/bymachungtu/:machungtu')
    getChungTuKetChuyenByMaChungTu(@Param('machungtu') maChungTu: string){
        return this.chungTuKetChuyenService.getChungTuKetChuyenByMaChungTu(maChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.chungTuKetChuyenService.soChungTuGhiSoNext()
    }
    @Post('createchungtuketchuyen')
    createdChungTuKetChuyen(){
        return this.chungTuKetChuyenService 
    }
}
