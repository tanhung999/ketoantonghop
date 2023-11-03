import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class DanhmuctaikhoancongnokhachhangService {
    constructor (private prismaService : PrismaService){}
    async getAll(){
        return await this.prismaService.tDanhMucKhachHang.findMany({
            include: {
                tDanhMucTaiKhoanCongNoKhachHang: true
            }
        });
    } 
    async  getDanhMucKhachHangByMaKhachHang(maKhachHang) {
        return await this.prismaService.tDanhMucKhachHang.findMany({
            where: {
                cMaKhachHang: maKhachHang
            },
            include: {
                tDanhMucTaiKhoanCongNoKhachHang: true
            }
        })
    }
}
