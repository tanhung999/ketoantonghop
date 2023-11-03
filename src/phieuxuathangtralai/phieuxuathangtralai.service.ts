import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';

@Injectable()
export class PhieuxuathangtralaiService {
    constructor (private prismaService: PrismaService){}
    async getAll() {
        return await this.prismaService.tPhieuXuatHangTraLai.findMany({
            include:{
                tPhieuXuatHangTraLaiChiTiet: true
            }
        })
    }
    async getPhieuXuatHangTraLaiBySoChungTu(soChungTu){
        const soChungTuConfig = soChungTu.replace('-','/')
        return this.prismaService.tPhieuNhapHangTraLai.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include: {
                tPhieuNhapHangTraLaiChiTiet: true
            }
        })
    }
    async getPhieuXuatHangTraLai(){
        return this.prismaService.tPhieuXuatHangTraLai.findMany({
            select:selectChungTu,
            orderBy: {dNgayChungTu}
        })
    }
}
