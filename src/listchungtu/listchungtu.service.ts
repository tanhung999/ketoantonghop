import { Injectable } from '@nestjs/common';
import { PhieuchichitietService } from '../phieuchichitiet/phieuchichitiet.service';
import { PhieuthuchitietService } from '../phieuthuchitiet/phieuthuchitiet.service';
import { ChungtughisoService } from '../chungtughiso/chungtughiso.service';
import { ChungtunganhangService } from '../chungtunganhang/chungtunganhang.service';
import { PhieunhaphanghoaService } from '../phieunhaphanghoa/phieunhaphanghoa.service';
import { PhieuxuathanghoaService } from '../phieuxuathanghoa/phieuxuathanghoa.service';
import { PhieunhaphangtralaiService } from '../phieunhaphangtralai/phieunhaphangtralai.service';
import { PhieuxuathangtralaiService } from '../phieuxuathangtralai/phieuxuathangtralai.service';

@Injectable()
export class ListchungtuService {
    constructor (
        private phieuChiService: PhieuchichitietService,
        private phieuThuService: PhieuthuchitietService,
        private chungTuGhiSoService: ChungtughisoService,
        private chungTuNganHangService : ChungtunganhangService,
        private phieuNhapHangHoaService : PhieunhaphanghoaService,
        private phieuXuatHangHoaService : PhieuxuathanghoaService,
        private phieuNhapHangTraLaiService : PhieunhaphangtralaiService,
        private phieuXuatHangTraLaiSerivce : PhieuxuathangtralaiService
    ){}

    async getChungTu(){
        const chungTuPhieuChi= await this.phieuChiService.getChungTuPhieuChi()
        const chungTuPhieuThu = await  this.phieuThuService.getChungTuPhieuThu()
        const chungTuGhiSo = await this.chungTuGhiSoService.getChungTuGhiSo()
        const chungTuNganHang =  await this.chungTuNganHangService.getChungTuNganHang()
        const chungTuNhapHang = await this.phieuNhapHangHoaService.getPhieuNhapHangHoa()
        const chungTuXuatHang = await this.phieuXuatHangHoaService.getPhieuXuatHangHoa()
        const chungTuNhapHangTraLai = await this.phieuNhapHangTraLaiService.getPhieuNhapHangTraLai()
        const chungTuXuatHangTraLai = await this.phieuXuatHangTraLaiSerivce.getPhieuXuatHangTraLai()
        return {
            chungTuPhieuThu,
            chungTuPhieuChi,
            chungTuGhiSo,
            chungTuNganHang,
            chungTuNhapHang,
            chungTuXuatHang,
            chungTuNhapHangTraLai,
            chungTuXuatHangTraLai
        }
    }
}
