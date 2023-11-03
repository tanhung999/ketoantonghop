import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DanhmuctaikhoanService {
    constructor(private prismaService: PrismaService) {

    }
    async getAll(){
        return await this.prismaService.tDanhMucTaiKhoan.findMany();
    }
    async getDanhMucTaiKhoanBySoTaiKhoan(soTaiKhoan){
        return await this.prismaService.tDanhMucTaiKhoan.findUnique({
            where: {
                cTaiKhoan: soTaiKhoan
            }
        })
    }
}
