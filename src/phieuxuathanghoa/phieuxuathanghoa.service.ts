import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';

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
        const listChungTu =  await  this.prismaService.tPhieuXuatHangHoa.findMany({
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
        return soChungTuNext((await this.getPhieuXuatHangHoa()).chungTuLast)
    }
    async hangHoaDaXuat() {
        const hangDaXuat = await this.prismaService.$queryRaw`SELECT cMaChungTuNhap, cMaHang, SUM(nSoLuong)AS 'SoLuongXuat',SUM(nThanhTienGiaVon) AS 'ThanhTien'
            FROM tPhieuXuatHangHoaChiTiet
            GROUP BY cMaChungTuNhap, cMaHang`
        return hangDaXuat
    }
}
