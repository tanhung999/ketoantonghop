import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ChungtunganhangService } from './chungtunganhang.service';
import { InsertChungTuNganHangChiTietDTO, InsertChungTuNganHangDTO, UpdateChungTuNganHangChiTietDTO, UpdateChungTuNganHangDTO } from './dto';

@Controller('chungtunganhang')
export class ChungtunganhangController {
    constructor (private chungTuNganHangService: ChungtunganhangService){}
    @Get()
    getAll (){
        return this.chungTuNganHangService.getAll()
    }
    @Get('/bymachungtu/:machungtu')
    getChungTuNganHangBySoChungTu(@Param('machungtu') maChungTu: string ){
        return this.chungTuNganHangService.getChungTuNganHangByMaChungTu(maChungTu)
    }

    @Get('sochungtunext')
    getSoChungTuGhiSoNext (){
        return this.chungTuNganHangService.soChungTuGhiSoNext()
    }
    @Post('createchungtunganhang')
    cretedChungTuNganHang (
        @Body() insertChungTuNganHang: any
    ){
        const {insertChungTuNganHangData,insertChungTuNganHangChiTietData}= insertChungTuNganHang as {
            insertChungTuNganHangData: InsertChungTuNganHangDTO,
            insertChungTuNganHangChiTietData: InsertChungTuNganHangChiTietDTO
        }
        return this.chungTuNganHangService.createChungTuNganHang(insertChungTuNganHangData,insertChungTuNganHangChiTietData)
    }
    @Patch('/updatechungtunganhang/:machungtu')
        updatedChungTuNganHang (
            @Param('machungtu') maChungTu: string,
            @Body() updateChungTuNganHang: any,
            @Query('maso', ParseIntPipe) maSo: number
        ){
            const {updateChungTuNganHangData, updateChungTuNganHangChiTietData}= updateChungTuNganHang as {
                updateChungTuNganHangData: UpdateChungTuNganHangDTO,
                updateChungTuNganHangChiTietData: UpdateChungTuNganHangChiTietDTO
            }
            const chungTuNganHangAfterUpdate = this.chungTuNganHangService.updateChungTuNganHang(updateChungTuNganHangData,maChungTu)
            const chungtTuNganHangChiTietAfterUpdate =this.chungTuNganHangService.updateChungTuNganHangChiTiet(updateChungTuNganHangChiTietData,maChungTu,maSo)

            return {
                message : 'Updated Successfully',
                chungTuNganHangAfterUpdate,
                chungtTuNganHangChiTietAfterUpdate
            }
        }
    @Delete ('/deletechungtunganhang/:machungtu')
    deletedChungTuNganHang(
        @Param('machungtu') maChungTu: string
    ) {
        return this.chungTuNganHangService.deleteChungTuNganHang(maChungTu)

    }
}
