import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';

@Injectable()
export class PhieuthuchitietService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        const phieuThuChiTiet = await this.prismaService.tPhieuThu.findMany({
            include: {
                tPhieuThuChiTiet: true
            }
        })
        return phieuThuChiTiet
    }
    async getPhieuThuBySoChungTu(soChungTu){
        const soChungTuConfig= soChungTu.replace('-','/')
        return await this.prismaService.tPhieuThu.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include: {
                tPhieuThuChiTiet: true
            }
        })
    }
    async getChungTuPhieuThu (){
        return await this.prismaService.tPhieuThu.findMany({
            select: selectChungTu,
            orderBy: {dNgayChungTu}
        })
    }
    
}
