import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';

@Injectable()
export class PhieuchichitietService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        const phieuChiChiTiet = await this.prismaService.tPhieuChi.findMany({
            include: {
                tPhieuChiChiTiet: true
            }
        })
        return phieuChiChiTiet
    }
    async getPhieuChiBySoChungTu(soChungTu) {
        const soChungTuConfig = soChungTu.replace('-','/')
        return await this.prismaService.tPhieuChi.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include :{
                tPhieuChiChiTiet: true
            }
        })
    }
    async getChungTuPhieuChi (){
        return await this.prismaService.tPhieuChi.findMany({
            select: selectChungTu,
            orderBy: {dNgayChungTu}
        })
    }
}
