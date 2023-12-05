import { Body, Controller,Delete,Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PhieuxuathanghoaService } from './phieuxuathanghoa.service';
import { InsertPhieuXuatChiTietDTO, InsertPhieuXuatDTO, UpdatePhieuXuatChiTietDTO, UpdatePhieuXuatDTO } from './dto';

@Controller('phieuxuathanghoa')
export class PhieuxuathanghoaController {
    constructor (private phieuXuatHangHoaService: PhieuxuathanghoaService) {}
    @Get()
    getAll(){
        return this.phieuXuatHangHoaService.getAll()
    }
    @Get('/bysochungtu/:sochungtu')
    getPhieuXuatHangHoaBySoChungTu (@Param('sochungtu') soChungTu: string){
        return this.phieuXuatHangHoaService.getPhieuXuatHangHoaByMaChungTu(soChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuXuatHangHoaService.soChungTuGhiSoNext()
    }
    @Get('hangdaxuat')
    getHangDAXuat (){
        return this.phieuXuatHangHoaService.hangHoaDaXuat()
    }
    @Post('createphieuxuat')
    cretedPhieuXuatHang (
        @Body() insertData : any
    ){
        const {insertPhieuXuatData, insertPhieuXuatHangHoaChiTietData} = insertData as {
            insertPhieuXuatData: InsertPhieuXuatDTO,
            insertPhieuXuatHangHoaChiTietData: InsertPhieuXuatChiTietDTO
        }
        return this.phieuXuatHangHoaService.createPhieuXuatHangHoa(insertPhieuXuatData,insertPhieuXuatHangHoaChiTietData)
    }
    @Patch('updatephieuxuat/:machungtu')
    updatePhieuXuatHangHoa (
        @Body() updateData : any,
        @Param('machungtu') maChungTu : string,
        @Query('id',ParseIntPipe) id : number
    ){
        const {updatePhieuXuatData, updatePhieuXuatHangHoaChiTietData} = updateData as {
            updatePhieuXuatData: UpdatePhieuXuatDTO,
            updatePhieuXuatHangHoaChiTietData: UpdatePhieuXuatChiTietDTO
        }
        return this.phieuXuatHangHoaService.updatePhieuXuat(updatePhieuXuatData,updatePhieuXuatHangHoaChiTietData,maChungTu,id)
    }
    @Delete('deletephieuxuat/:machungtu') 
    deletedPhieuXuat (
        @Param ('machungtu') maChungTu : string
    ){
        return this.phieuXuatHangHoaService.deletePhieuXuat(maChungTu)
    }
}
