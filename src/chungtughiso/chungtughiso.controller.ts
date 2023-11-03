import { Controller,Get, Param } from '@nestjs/common';
import { ChungtughisoService } from './chungtughiso.service';


@Controller('chungtughiso')
export class ChungtughisoController {
    constructor (private chungTuGhiSoService : ChungtughisoService) {}
    @Get()
    getChungTuGhiSo(){
        return this.chungTuGhiSoService.getAll()
    }
    @Get(':sochungtu')
    getChungTuGhiSoByMaChungTu(@Param ('sochungtu') soChungTu: string ){
        return this.chungTuGhiSoService.getChungTuGhiSoBySoChungTu(soChungTu)
    }

}
