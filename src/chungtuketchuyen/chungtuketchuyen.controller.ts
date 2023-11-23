import { Body, Controller,Get, Param, Post } from '@nestjs/common';
import { ChungtuketchuyenService } from './chungtuketchuyen.service';
import { InsertChungTuKetChuyenDTO, InsertChungTuKetChuyenChiTietDTO } from './dto';

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
    createdChungTuKetChuyen(
        @Body() insertChungTu : any
    ){
        const {chungTuKetChuyenData,ketChuyenChiTietData} = insertChungTu as {
            chungTuKetChuyenData: InsertChungTuKetChuyenDTO,
            ketChuyenChiTietData: InsertChungTuKetChuyenChiTietDTO
        }
        return this.chungTuKetChuyenService.createdChungTuKetChuyen(chungTuKetChuyenData,ketChuyenChiTietData)
    }
}
