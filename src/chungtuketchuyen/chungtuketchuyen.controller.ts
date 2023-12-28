import { Body, Controller,Delete,Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ChungtuketchuyenService } from './chungtuketchuyen.service';
import { InsertChungTuKetChuyenDTO, InsertChungTuKetChuyenChiTietDTO, UpdateChungTuKetChuyenDTO, UpdateChungTuKetChuyenChiTietDTO } from './dto';

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
    @Patch('/update/:bymachungtu')
    updatedChungTuKetChuyen(
        @Body() updateChungTuData : any,
        @Param('bymachungtu') maChungTu: string,
        @Query('maso',ParseIntPipe) id: number
    
    ){
        const {_tChungTuKetChuyen,updateChungTuKetChuyenChiTietData} =
        updateChungTuData as {_tChungTuKetChuyen: UpdateChungTuKetChuyenDTO,updateChungTuKetChuyenChiTietData:UpdateChungTuKetChuyenChiTietDTO}
        return this.chungTuKetChuyenService.updateChungTuKetChuyen(_tChungTuKetChuyen,updateChungTuKetChuyenChiTietData,maChungTu,id)
    }   
    @Delete('/deletedchungtuketchuyen/:bymachungtu')
    deleteChungTuKetChuyen(
        @Param('bymachungtu') maChungTu:string
    ){
        return this.chungTuKetChuyenService.deleteChungTuKetChuyen(maChungTu)
    }
    
}
