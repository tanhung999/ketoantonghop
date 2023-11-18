import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { soChungTuNext } from '../getChungTuNext';
import { getChungTuLasted } from '../getchungtulasted';

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
        const phieuThu= await this.prismaService.tPhieuThu.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include: {
                tPhieuThuChiTiet: true
            }
        })
        let tongSoTien = 0
        phieuThu.map(e=>{
            e.tPhieuThuChiTiet.map(obj =>{
                tongSoTien+=obj.nSoTien
            })
        })
        phieuThu[''].TongSoTien = tongSoTien
        console.log(phieuThu)
    }
    async getChungTuPhieuThu (){
        const listChungTu =  await this.prismaService.tPhieuThu.findMany({
            select: selectChungTu,
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
        return soChungTuNext((await this.getChungTuPhieuThu()).chungTuLast)
    }
    
}
