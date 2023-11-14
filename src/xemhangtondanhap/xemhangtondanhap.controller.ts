import { Controller, Get, Param } from '@nestjs/common';
import { XemhangtondanhapService } from './xemhangtondanhap.service';

@Controller('xemhangtondanhap')
export class XemhangtondanhapController {
    constructor(private xemHangTonDaNhapService: XemhangtondanhapService ){}
    @Get('getHangTonDaNhap')
    getHangTonDaNhap(){
        return this.xemHangTonDaNhapService.getHangHoaDaNhap()
    }
    @Get('getHangTraLai')
    getHangTraLai(){
        return this.xemHangTonDaNhapService.getHangTraLai();
    
    }
    @Get('getHangTonDau')
     getHangTonDau(){
        return this.xemHangTonDaNhapService.getHangTonDau()
    }
    @Get('tatCaHangTon')
    allHangTon(){
        return this.xemHangTonDaNhapService.allHangTon()
    }
    @Get('hangtontheolo')
    hangTonTheoLo(){
        return this.xemHangTonDaNhapService.hangTonTheoLo()
    }
    @Get('hangtontheolo/:bymahang')
    hangTonTheoMa(@Param('bymahang') bymahang:string){
        return this.xemHangTonDaNhapService.hangTonTheoMa(bymahang)
    }
}
