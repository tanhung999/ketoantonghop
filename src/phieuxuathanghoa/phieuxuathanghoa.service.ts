import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';

@Injectable()
export class PhieuxuathanghoaService {
    constructor (private prismaService: PrismaService) {}
    async getAll(){
        return await this.prismaService.tPhieuXuatHangHoa.findMany({
            include: {
                tPhieuXuatHangHoaChiTiet: true
            }
        })
    }
    async getPhieuXuatHangHoaBySoChungTu(soChungTu){
        const soChungTuConfig = soChungTu.replace('-','/')
        return this.prismaService.tPhieuXuatHangHoa.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include: {
                tPhieuXuatHangHoaChiTiet: true
            }
        })
    }
    async getPhieuXuatHangHoa(){
        return this.prismaService.tPhieuXuatHangHoa.findMany({
            select:selectChungTu,
            orderBy: {dNgayChungTu}
        })
    }
}
