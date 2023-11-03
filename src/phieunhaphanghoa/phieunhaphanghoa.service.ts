import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';

@Injectable()
export class PhieunhaphanghoaService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        return await this.prismaService.tPhieuNhapHangHoa.findMany({
            include: {
                tPhieuNhapHangHoaChiTiet: true
            }
        })
    }
    async getPhieuNhapHangHoaBySoChungTu(soChungTu){
        const soChungTuConfig = soChungTu.replace('-','/')
        return await this.prismaService.tPhieuNhapHangHoa.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include: {
                tPhieuNhapHangHoaChiTiet: true
            }
        })
    }
    async getPhieuNhapHangHoa(){
        return await this.prismaService.tPhieuNhapHangHoa.findMany({
            select:selectChungTu,
            orderBy: {dNgayChungTu}
        })
    }
}
