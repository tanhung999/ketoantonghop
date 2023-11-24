import { Body, Controller,Delete,Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ChungtughisoService } from './chungtughiso.service';
import { InsertChungTuGhiSoDTO, UpdateChungTuGhiSoChiTietDTO, UpdateChungTuGhiSoDTO,InsertChungTuGhiSoChiTietDTO } from './dto';


@Controller('chungtughiso')
export class ChungtughisoController {
    constructor (private chungTuGhiSoService : ChungtughisoService) {}
    @Get()
    getChungTuGhiSo(){
        return this.chungTuGhiSoService.getAll()
    }
    @Get('/bysochungtu/:machungtu')
    getChungTuGhiSoByMaChungTu(@Param ('machungtu') maChungTu: string ){
        return this.chungTuGhiSoService.getChungTuGhiSoByMaChungTu(maChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.chungTuGhiSoService.soChungTuGhiSoNext()
    }
    @Post('createdchungtughiso')
    createNewChungTuGhiSo ( @Body() insertChungTuGhiSo: any) {
        const {chungTuGhiSoData,chungTuGhiSoChiTietData} = insertChungTuGhiSo as {
            chungTuGhiSoData:InsertChungTuGhiSoDTO,
            chungTuGhiSoChiTietData:InsertChungTuGhiSoChiTietDTO
        
        }
        return this.chungTuGhiSoService.createdChungTuGhiSo(chungTuGhiSoData,chungTuGhiSoChiTietData)
    }
    @Patch('updatedchungtughiso/:bymachungtu')
    updatedChungTuGhiSo(
        @Param('bymachungtu') maChungTu: string,
        @Body() updateData: any,
        @Query('maso',ParseIntPipe) maSo: number
    ){
        const {chungTuGhiSoData, chungTuGhiSoChiTietData} = updateData as {
        chungTuGhiSoData: UpdateChungTuGhiSoDTO,
        chungTuGhiSoChiTietData: UpdateChungTuGhiSoChiTietDTO
       }
         
        const chungTuGhiSo= this.chungTuGhiSoService.updatedChungTuGhiSo(maChungTu,chungTuGhiSoData)
        const chungTuGhiSoChiTiet = this.chungTuGhiSoService.updatedChungTuGhiSoChiTiet(maSo,maChungTu,chungTuGhiSoChiTietData)
        return this.chungTuGhiSoService.getChungTuGhiSoByMaChungTu(maChungTu)
    }
    @Delete('/deletedchungtughiso/:bymsochungtu')
    deleteChungTu(
       @Param('bymsochungtu') machungtu :string 
    ){
       return this.chungTuGhiSoService.deletedChungTuGhiSo(machungtu)
    }
}
