import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class DanhmuchanghoaService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        return await this.prismaService.tDanhMucHangHoa.findMany({
            
        })
    }
    async getHangHoaByMaHang(maHangHoa){
        return this.prismaService.tDanhMucHangHoa.findMany({
            
            where : {
                cMaHang: maHangHoa,
            }
            
        })
    }
}
