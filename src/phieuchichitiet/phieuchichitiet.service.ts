import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';

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
        const listChungTu = await this.prismaService.tPhieuChi.findMany({
            select: selectChungTu,
            orderBy: {dNgayChungTu}
        })
        const chungTuLast = getChungTuLasted(listChungTu)
        const chungTu = {
            listChungTu,
            chungTuLast
        }
        return chungTu
    }
    
    async soChungTuGhiSoNext () {
        return soChungTuNext((await this.getChungTuPhieuChi()).chungTuLast)
    }
}
