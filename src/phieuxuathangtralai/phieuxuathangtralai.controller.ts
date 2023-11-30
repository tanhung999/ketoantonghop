import { Body, Controller,Delete,Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PhieuxuathangtralaiService } from './phieuxuathangtralai.service';
import { InsertPhieuXuatHangTraLaiChiTietDTO, InsertPhieuXuatHangTraLaiDTO, UpdatePhieuXuatHangTraLaiChiTietDTO, UpdatePhieuXuatHangTraLaiDTO } from './dto';

@Controller('phieuxuathangtralai')
export class PhieuxuathangtralaiController {
    constructor (private phieuXuatHangTraLaiService: PhieuxuathangtralaiService){}
    @Get()
    getAll(){
        return this.phieuXuatHangTraLaiService.getAll()
    }
    @Get(':/bysochungtu/:sochungtu')
    getPhieuXuatHangTraLaiBySoChungTu(@Param('sochungtu')soChungTu: string){
        return this.phieuXuatHangTraLaiService.getPhieuXuatHangTraLaiByMaChungTu(soChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuXuatHangTraLaiService.soChungTuGhiSoNext()
    }
    @Get('hanghoatralai')
    getHangHoaTraLai(){
        return this.phieuXuatHangTraLaiService.hangHoaTraLai()
    }
    @Post('createphieuxuathangtralai')
    createdPhieuXuatHangTraLai(
        @Body () insertData : any
    ){
        const {insertPhieuXuatHangTraLaiData,insertPhieuXuatHangTraLaiChiTietData} = insertData as {
            insertPhieuXuatHangTraLaiData: InsertPhieuXuatHangTraLaiDTO,
            insertPhieuXuatHangTraLaiChiTietData: InsertPhieuXuatHangTraLaiChiTietDTO
        }
        return this.phieuXuatHangTraLaiService.createPhieuXuatHangTraLai(insertPhieuXuatHangTraLaiData,insertPhieuXuatHangTraLaiChiTietData)
    }
    @Patch('updatephieuxuathangtralai/:machungtu')
    updatedPhieuXuatHangTraLai(
        @Body () updateData : any,
        @Param('machungtu') maChungTu: string,
        @Query('maso',ParseIntPipe) maSo : number
    ){
        const {updatePhieuXuatHangTraLaiData,updatePhieuXuatHangTraLaiChiTietData} = updateData as {
            updatePhieuXuatHangTraLaiData: UpdatePhieuXuatHangTraLaiDTO,
            updatePhieuXuatHangTraLaiChiTietData: UpdatePhieuXuatHangTraLaiChiTietDTO
        }
        return this.phieuXuatHangTraLaiService.updatePhieuXuatHangTraLai(updatePhieuXuatHangTraLaiData,updatePhieuXuatHangTraLaiChiTietData,maChungTu,maSo)
    }
    @Delete('deletephieuxuathangtralai/:machungtu')
    deletedPhieuXuatHangTraLai(maChungTu: string){
        return this.phieuXuatHangTraLaiService.deletePhieuXuatHangTraLai(maChungTu)
    }
}
