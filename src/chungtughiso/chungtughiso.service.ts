import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';
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
    async getChungTuGhiSo (){
        const listChungTuGhiSo = await this.prismaService.tChungTuGhiSo.findMany({
            select :selectChungTu,
            orderBy: {dNgayChungTu}
        })
        const chungTuGhiSoLast = getChungTuLasted(listChungTuGhiSo)
        const chungTuGhiSo = {
            listChungTuGhiSo,
            chungTuGhiSoLast
        }
        return chungTuGhiSo
    }
    
    async soChungTuGhiSoNext () {
        
        return soChungTuNext((await this.getChungTuGhiSo()).chungTuGhiSoLast)
    }
}
