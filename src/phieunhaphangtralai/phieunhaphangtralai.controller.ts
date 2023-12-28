import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PhieunhaphangtralaiService } from './phieunhaphangtralai.service';
import { InsertPhieuNhapHangTraLaiChiTietDTO, InsertPhieuNhapHangTraLaiDTO, UpdatePhieuNhapHangTraLaiChiTietDTO, UpdatePhieuNhapHangTraLaiDTO } from './dto';

@Controller('phieunhaphangtralai')
export class PhieunhaphangtralaiController {
    constructor (private phieuNhapHangTraLaiService: PhieunhaphangtralaiService){}
    @Get()
    getAll(){
        return this.phieuNhapHangTraLaiService.getAll()
    }
    @Get('/bymachungtu/:machungtu')
    getPhieuNhapHangHoaTraLaiBySoChungTu(@Param('machungtu') maChungTu: string ){
        return this.phieuNhapHangTraLaiService.getPhieuNhapHangTraLaiByMaChungTu(maChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuNhapHangTraLaiService.soChungTuGhiSoNext()
    }
    @Post('createphieunhaphangtralai')
    createdPhieuNhapHangTralai (
        @Body() insertData: any 
    ) {
        const {insertPhieuNhapHangHoaTraLaiData,insertPhieuNhapHangHoaTraLaiChiTietData} = insertData as {
            insertPhieuNhapHangHoaTraLaiData: InsertPhieuNhapHangTraLaiDTO,
            insertPhieuNhapHangHoaTraLaiChiTietData: InsertPhieuNhapHangTraLaiChiTietDTO
        }
        return this.phieuNhapHangTraLaiService.createPhieuNhapHangHoaTraLai(insertPhieuNhapHangHoaTraLaiData,insertPhieuNhapHangHoaTraLaiChiTietData)
    }
    @Patch('update/:machungtu')
    updatedPhieuNhapHangTraLai(
        @Body() updateData:any,
        @Param('machungtu') maChungTu:string,
        @Query('maso',ParseIntPipe) maSo: number
    ) {
        const {_tPhieuNhapHangTraLai,updatePhieuNhapHangHoaTraLaiChiTietData} =updateData as {
            _tPhieuNhapHangTraLai: UpdatePhieuNhapHangTraLaiDTO,
            updatePhieuNhapHangHoaTraLaiChiTietData: UpdatePhieuNhapHangTraLaiChiTietDTO
        }
        return this.phieuNhapHangTraLaiService.updatePhieuNhapHangTraLai(_tPhieuNhapHangTraLai,updatePhieuNhapHangHoaTraLaiChiTietData,maChungTu,maSo)
    }
    @Delete('deletephieunhaphangtralai/:machungtu')
    deletePhieuNhapHangTraLai(
        @Param('machungtu') maChungTu: string
    ){
        return this.phieuNhapHangTraLaiService.deletePhieuNhapHangTraLai(maChungTu)
    }

}
