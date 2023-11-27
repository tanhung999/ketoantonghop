import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PhieuchichitietService } from './phieuchichitiet.service';
import { InsertPhieuChiChiTietDTO, InsertPhieuChiDTO } from './dto';
import { convertMaChungTu } from 'src/convert.sochungtu.ts';

@Controller('phieuchichitiet')
export class PhieuchichitietController {
    constructor (private phieuChiChiTietService: PhieuchichitietService){}
    @Get()
    getAll(){
        return this.phieuChiChiTietService.getAll()
    }
    @Get('/bymachungtu/:machungtu')
    getPhieuChiBySoChungTu(@Param('machungtu') maChungTu: string){
        return this.phieuChiChiTietService.getPhieuChiByMaChungTu(maChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuChiChiTietService.soChungTuGhiSoNext()
    }
    @Post('createphieuchi')
    createdPhieuChi(
        @Body() insertData : any
    ){
        const {insertPhieuChiData,insertPhieuChiChiTietData} = insertData as {
            insertPhieuChiData: InsertPhieuChiDTO,
            insertPhieuChiChiTietData: InsertPhieuChiChiTietDTO
        }
        return this.phieuChiChiTietService.createPhieuChi(insertPhieuChiData,insertPhieuChiChiTietData);
    }
    @Patch('updatephieuchi/:machungtu')
    updatePhieuChi(
        @Body() updateData:any,
        @Param('machungtu') maChungTu: string,
        @Query('id', ParseIntPipe) id:number
    ){
        const {updatePhieuChiData,updatePhieuChiChiTietData} = updateData as {
            updatePhieuChiData: InsertPhieuChiDTO,
            updatePhieuChiChiTietData: InsertPhieuChiChiTietDTO
        }
        return this.phieuChiChiTietService.updatePhieuChi(updatePhieuChiData,updatePhieuChiChiTietData,maChungTu,id)
    }
}
