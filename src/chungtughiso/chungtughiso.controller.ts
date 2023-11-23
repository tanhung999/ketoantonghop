import { Body, Controller,Delete,Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ChungtughisoService } from './chungtughiso.service';
import { InsertChungTuGhiSoDTO, UpdateChungTuGhiSoChiTietDTO, UpdateChungTuGhiSoDTO } from './dto';


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
    @Post('createdchungtughiso')
    createNewChungTuGhiSo ( @Body() insertChungTuGhiSo: InsertChungTuGhiSoDTO) {
        return this.chungTuGhiSoService.createdChungTuGhiSo(insertChungTuGhiSo)
    }
    @Patch('updatedchungtughiso/:bymachungtu')
    updatedChungTuGhiSo(
        @Param('bymachungtu') machungtu: string,
        @Body() updateData: any,
        @Query('maso',ParseIntPipe) maso: number
    ){
        const {chungTuGhiSoData, chungTuGhiSoChiTietData} = updateData as {
        chungTuGhiSoData: UpdateChungTuGhiSoDTO,
        chungTuGhiSoChiTietData: UpdateChungTuGhiSoChiTietDTO
       }
       if(maso === undefined || chungTuGhiSoChiTietData===undefined ) {
           return this.chungTuGhiSoService.updatedChungTuGhiSo(machungtu,chungTuGhiSoData)
       } else if (chungTuGhiSoData === undefined) {
            return  this.chungTuGhiSoService.updatedChungTuGhiSoChiTiet(chungTuGhiSoChiTietData,maso,machungtu)
       } else {
        return {
            chungtughiso: this.chungTuGhiSoService.updatedChungTuGhiSo(machungtu,chungTuGhiSoData),
            chungtughisochitiet: this.chungTuGhiSoService.updatedChungTuGhiSoChiTiet(chungTuGhiSoChiTietData,maso,machungtu)
        }
       }
    }
    @Delete('/deletedchungtughiso/:bymsochungtu')
    deleteChungTu(
       @Param('bymsochungtu') machungtu :string 
    ){
        const resultDeletedGhiSoChiTiet= this.chungTuGhiSoService.deletedChungTuGhiSoChiTiet(machungtu)
        if(resultDeletedGhiSoChiTiet) return this.chungTuGhiSoService.deletedChungTuGhiSo(machungtu)
        return {error: "Record not found"}
    }
}
