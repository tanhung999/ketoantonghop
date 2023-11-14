import { Injectable } from '@nestjs/common';
import { PhieuxuathanghoaService } from '../phieuxuathanghoa/phieuxuathanghoa.service';
import { PhieuxuathangtralaiService } from '../phieuxuathangtralai/phieuxuathangtralai.service';

@Injectable()
export class XemhangdaxuatService {
    constructor(private phieuXuatHangHoaService: PhieuxuathanghoaService,
        private phieuXuatHangTraLaiService : PhieuxuathangtralaiService) {}

    async getAllHangHoaDaXuat(){
        const phieuXuatHangHoa = await this.phieuXuatHangHoaService.hangHoaDaXuat()
        const hangHoaXuatTraLai = await this.phieuXuatHangTraLaiService.hangHoaTraLai()
        return [].concat(phieuXuatHangHoa ,hangHoaXuatTraLai)
    }
}
