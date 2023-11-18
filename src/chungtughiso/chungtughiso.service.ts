import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';
@Injectable()
export class ChungtughisoService {  
    constructor (private prismaService: PrismaService){}
    
    async getAll(){
        return await this.prismaService.tChungTuGhiSo.findMany({
            include: {
                tChungTuGhiSoChiTiet: true
            }
        })
    }
    
    async getChungTuGhiSoBySoChungTu (soChungTu){
        const soChungTuConfig = soChungTu.replace('-', '/');
        return await this.prismaService.tChungTuGhiSo.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include: {
                tChungTuGhiSoChiTiet: true
            }
        })
    }
    async getChungTuGhiSo(){
        const listChungTu = await this.prismaService.tChungTuGhiSo.findMany({
            select :selectChungTu,
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
        return soChungTuNext((await this.getChungTuGhiSo()).chungTuLast)
    }
}
