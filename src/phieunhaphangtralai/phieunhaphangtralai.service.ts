import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from 'src/select';
import { soChungTuNext } from '../getChungTuNext';
import { getChungTuLasted } from '../getchungtulasted';

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
        const listChungTu = await this.prismaService.tPhieuNhapHangTraLai.findMany({
            select:selectChungTu,
            orderBy: [
                {dNgayChungTu},
                
                {cSoChungTu}
            ]
        })
        const chungTuLast = getChungTuLasted(listChungTu)
        const chungTu = {
            listChungTu,
            chungTuLast
        }
        return chungTu
    }
    
    async soChungTuGhiSoNext () {
        return soChungTuNext((await this.getPhieuNhapHangTraLai()).chungTuLast)
    }
}
