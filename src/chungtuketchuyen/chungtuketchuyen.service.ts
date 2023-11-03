import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
