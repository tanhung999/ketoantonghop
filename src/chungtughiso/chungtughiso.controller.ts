import { Controller,Get, Param, Post } from '@nestjs/common';
import { ChungtughisoService } from './chungtughiso.service';


@Controller('chungtughiso')
export class ChungtughisoController {
    constructor (private chungTuGhiSoService : ChungtughisoService) {}
    @Get()
    getChungTuGhiSo(){
        return this.chungTuGhiSoService.getAll()
    }
    @Get('/bysochungtu/:sochungtu')
    getChungTuGhiSoByMaChungTu(@Param ('sochungtu') soChungTu: string ){
        return this.chungTuGhiSoService.getChungTuGhiSoBySoChungTu(soChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.chungTuGhiSoService.soChungTuGhiSoNext()
    }
    @Post('newChungTuGhiSo')
    createNewChungTuGhiSo () {
        return this.chungTuGhiSoService
    }
}
