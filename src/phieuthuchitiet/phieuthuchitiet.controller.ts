import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PhieuthuchitietService } from './phieuthuchitiet.service';
import { InsertPhieuThuChiTietDTO, InsertPhieuThuDTO, UpdatePhieuThuChiTietDTO, UpdatePhieuThuDTO } from './dto';

@Controller('phieuthuchitiet')
export class PhieuthuchitietController {
    constructor(private phieuThuChiTietService: PhieuthuchitietService){}
    @Get()
    getAll(){
        return this.phieuThuChiTietService.getAll()
    }
    @Get('/bymachungtu/:machungtu')
    getPhieuThuBySoChungTu(@Param('machungtu') maChungTu: string) {
        return this.phieuThuChiTietService.getPhieuThuByMaChungTu(maChungTu)
    }
    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.phieuThuChiTietService.soChungTuGhiSoNext()
    }
    @Post('createphieuthu')
    createdPhieuThu (@Body() insertData: any){
        const {insertPhieuThuData,insertPhieuThuChiTietData} = insertData as {
            insertPhieuThuData: InsertPhieuThuDTO,
            insertPhieuThuChiTietData: InsertPhieuThuChiTietDTO 
        }
        return this.phieuThuChiTietService.createPhieuThu(insertPhieuThuData,insertPhieuThuChiTietData)
    }
    @Patch('update/:machungtu')
    updatedPhieuThu (@Body() updateData: any,
        @Param('machungtu') maChungTu : string,
        @Query('id', ParseIntPipe) id : number
    ){
        const {_tPhieuThu,updatePhieuThuChiTietData} = updateData as {
            _tPhieuThu: UpdatePhieuThuDTO,
            updatePhieuThuChiTietData: UpdatePhieuThuChiTietDTO 
        }
        return this.phieuThuChiTietService.updatePhieuThu(_tPhieuThu,updatePhieuThuChiTietData,maChungTu,id)
    }
    @Delete('deletephieuthu/:machungtu')
    deletedPhieuThu (@Param('machungtu') maChungTu: string){
        return this.phieuThuChiTietService.deletePhieuThu(maChungTu)
    }
}
