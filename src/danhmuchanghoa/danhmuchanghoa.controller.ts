import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DanhmuchanghoaService } from './danhmuchanghoa.service';
import { InsertHangHoaDTO, UpdateHangHoaDTO } from './dto';
@Controller('danhmuchanghoa')
export class DanhmuchanghoaController {
    constructor(private danhmuchanghoaService: DanhmuchanghoaService){}
    @Get()
    getAll(){
        return this.danhmuchanghoaService.getAll()
    }
    @Get('/bymahang/:mahanghoa')
    getHangHoaByMaHang(@Param('mahanghoa') maHangHoa: string){
        return this.danhmuchanghoaService.getHangHoaByMaHang(maHangHoa);
    }
    @Post('createhanghoa')
    createdHangHoa(
        @Body () insertHangHoaData : InsertHangHoaDTO 
    ){
        return this.danhmuchanghoaService.createHangHoa(insertHangHoaData)
    }
    @Patch('updatehanghoa/:bymahang')
    updatedHangHoa(
        @Body() updateHangHoaData : UpdateHangHoaDTO,
        @Param('bymahang') maHang: string
    ){
        return this.danhmuchanghoaService.updateHangHoa(updateHangHoaData,maHang)
    }
    @Delete('deletehanghoa/:bymahang')
    deletedHangHoa(@Param('bymahang') maHang:string){
        return this.danhmuchanghoaService.deleteHangHoa(maHang)
    }
    
}
