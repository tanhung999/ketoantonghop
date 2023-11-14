import { Controller, Get } from '@nestjs/common';
import { XemhangdaxuatService } from './xemhangdaxuat.service';

@Controller('xemhangdaxuat')
export class XemhangdaxuatController {
    constructor (private xemHangDaXuatService: XemhangdaxuatService) {}
    @Get()
    getAllHangHoaDaXuat(){
        return this.xemHangDaXuatService.getAllHangHoaDaXuat()
    }
}
