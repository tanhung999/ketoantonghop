import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class DanhmuchanghoaService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        try {
            return await this.prismaService.tDanhMucHangHoa.findMany()
        } catch (error) {
            throw new ForbiddenException(`Getting all data error ${error}`)
        }
    }
    async getHangHoaByMaHang(maHangHoa){
        try {
            return this.prismaService.tDanhMucHangHoa.findUnique({  
                where : {
                    cMaHang: maHangHoa,
                }
                
            })
        } catch (error) {
            throw new ForbiddenException(`Getting a record data error ${error}`)
        }
        
    }
    async createHangHoa(){}
}
