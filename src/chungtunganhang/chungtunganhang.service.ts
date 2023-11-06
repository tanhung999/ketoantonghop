import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';

@Injectable()
export class ChungtunganhangService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        return await this.prismaService.tChungTuNganHang.findMany({
            include: {
                tChungTuNganHangChiTiet: true
            }
        })
    }
    async getChungTuNganHangBySoChungTu(soChungTu){
        const soChungTuConfig = soChungTu.replace('-','/')
        return await this.prismaService.tChungTuNganHang.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include:{
                tChungTuNganHangChiTiet: true
            }
        })
    }
    async getChungTuNganHang(){
        const listChungTu =  await this.prismaService.tChungTuNganHang.findMany({
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
        return soChungTuNext((await this.getChungTuNganHang()).chungTuLast)
    }
}
