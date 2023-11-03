import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class DanhmuchanghoaService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        return await this.prismaService.tDanhMucHangHoa.findMany()
    }
}
