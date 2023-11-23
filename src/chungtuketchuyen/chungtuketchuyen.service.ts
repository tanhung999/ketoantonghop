import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { soChungTuNext } from '../getChungTuNext';
import {  cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';

@Injectable()
export class ChungtuketchuyenService {
    constructor (private prismaService: PrismaService){}
    async getAll(){
        return await this.prismaService.tChungTuKetChuyen.findMany({
            include: {
                tChungTuKetChuyenChiTiet: true
            }
        })
    }
    async getChungTuKetChuyenByMaChungTu(maChungTu){
        const maChungTuFirstCut = maChungTu.substr(0,9)
        const maChungTuLastCut = maChungTu.substr(10)
        const maChungTuConfig = maChungTuFirstCut+'/'+maChungTuLastCut
        console.log(maChungTuConfig)
        return await this.prismaService.tChungTuKetChuyen.findMany({
            where: {
                cMaChungTu:maChungTuConfig
            },
            include: {
                tChungTuKetChuyenChiTiet: true
            }
        })
    }
    async getChungTuKetChuyen(){
        const listChungTu = await this.prismaService.tChungTuKetChuyen.findMany({
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
        return soChungTuNext((await this.getChungTuKetChuyen()).chungTuLast)
    }
    async createdChungTuKetChuyen(){
        // return await this.prismaService.tChungTuKetChuyen.create({

        // })
    }
}
