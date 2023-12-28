import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PhieunhaphanghoaService } from './phieunhaphanghoa.service';
import { InsertPhieuNhapHangHoaChiTietDTO, InsertPhieuNhapHangHoaDTO, UpdatePhieuNhapHangHoaChiTietDTO, UpdatePhieuNhapHangHoaDTO } from './dto';

@Controller('phieunhaphanghoa')
export class PhieunhaphanghoaController {
    constructor (private phieuNhapHangHoaService: PhieunhaphanghoaService){}
    @Get()
    getAll(){
        return this.phieuNhapHangHoaService.getAll()
    }
    @Get('/bymachungtu/:machungtu')
    getPhieuNhapHangHoaBySoChungTu(@Param('machungtu') maChungTu: string){
        return this.phieuNhapHangHoaService.getPhieuNhapHangHoaByMaChungTu(maChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuNhapHangHoaService.soChungTuGhiSoNext()
    }
    @Post('createphieunhaphanghoa')
    createdPhieuNhapHangHoa(
        @Body() insertData : any  
    ){
        const {insertPhieuNhapHangHoaData,insertPhieuNhapHangHoaChiTietData} = insertData as {
            insertPhieuNhapHangHoaData: InsertPhieuNhapHangHoaDTO,
            insertPhieuNhapHangHoaChiTietData: InsertPhieuNhapHangHoaChiTietDTO
        }
        return this.phieuNhapHangHoaService.createPhieuNhapHangHoa(insertPhieuNhapHangHoaData,insertPhieuNhapHangHoaChiTietData)
    }
    @Patch('update/:machungtu')
    updatedPhieuNhapHangHoa (
        @Body() updateData: any,
        @Param('machungtu') maChungTu : string,
        @Query('maso',ParseIntPipe) maSo:number
    ){
        const {_tPhieuNhapHangHoa,updatePhieuNhapHangHoaChiTietData} = updateData as {
            _tPhieuNhapHangHoa: UpdatePhieuNhapHangHoaDTO,
            updatePhieuNhapHangHoaChiTietData: UpdatePhieuNhapHangHoaChiTietDTO
        }
        return this.phieuNhapHangHoaService.updatePhieuNhapHangHoa(_tPhieuNhapHangHoa,updatePhieuNhapHangHoaChiTietData,maSo,maChungTu)
    }
    @Delete('deletephieunhaphanghoa/:machungtu')
    deletedPhieuNhapHangHoa(@Param('machungtu') maChungTu: string){
        return this.phieuNhapHangHoaService.deletePhieuNhapHangHoa(maChungTu)
    }
}
