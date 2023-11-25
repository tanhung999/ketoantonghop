import { Controller, Get, Param, Post } from '@nestjs/common';
import { DanhmuchanghoaService } from './danhmuchanghoa.service';
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
    @Post('createHangHoa')
    createdHangHoa(){
        return this.danhmuchanghoaService.createHangHoa()
    }
}
