import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';

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
        const listChungTu = await this.prismaService.tPhieuNhapHangHoa.findMany({
            select:selectChungTu,
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
        return soChungTuNext((await this.getPhieuNhapHangHoa()).chungTuLast)
    }
    
  }