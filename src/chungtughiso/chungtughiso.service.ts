import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { dNgayChungTu, selectChungTu } from '../select';
import moment from "moment";
@Injectable()
export class ChungtughisoService {  
    constructor (private prismaService: PrismaService){}
    formattedDate (date: Date, format : string){
        return moment(date).format(format)
    }
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
         const chungTuGhiSo = await this.prismaService.tChungTuGhiSo.findMany({
            select :selectChungTu,
            orderBy: {dNgayChungTu}
        })
        return chungTuGhiSo
    }
    
}
