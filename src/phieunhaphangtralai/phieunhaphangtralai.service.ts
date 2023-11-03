import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from 'src/select';

@Injectable()
export class PhieunhaphangtralaiService {
    constructor (private prismaService: PrismaService){}
    async getAll(){
        return await this.prismaService.tPhieuNhapHangTraLai.findMany({
            include: {
                tPhieuNhapHangTraLaiChiTiet: true
            }
        })
    }
    async getPhieuNhapHangTraLaiBySoChungTu(soChungTu){
        const soChungTuConfig = soChungTu.replace('-','/')
        return await this.prismaService.tPhieuNhapHangTraLai.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include: {
                tPhieuNhapHangTraLaiChiTiet: true
            }
        })
    }
    async getPhieuNhapHangTraLai(){
        return await this.prismaService.tPhieuNhapHangTraLai.findMany({
            select:selectChungTu,
            orderBy: {dNgayChungTu}
        })
    }
}
