import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { soChungTuNext } from '../getChungTuNext';
import { getChungTuLasted } from '../getchungtulasted';

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
        const listChungTu =  await  this.prismaService.tPhieuXuatHangTraLai.findMany({
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
        
        return soChungTuNext((await this.getPhieuXuatHangTraLai()).chungTuLast)
    }
    async hangHoaTraLai(){
        return await this.prismaService.$queryRaw`SELECT cMaChungTuNhap,cMaHang, SUM(nSoLuong) AS 'SoLuong', SUM(nThanhTienGiaVon) AS 'ThanhTienGiaVon'
        FROM tPhieuXuatHangTraLaiChiTiet
        GROUP BY cMaChungTuNhap,cMaHang`
    }
}
