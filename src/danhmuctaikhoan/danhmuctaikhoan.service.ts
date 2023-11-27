import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertDanhMucTaiKhoanDTO } from './dto';
import { UpdateDanhMucTaiKhoanDTO } from './dto';

@Injectable()
export class DanhmuctaikhoanService {
    constructor(private prismaService: PrismaService) {
    }
    async getAll(){
        try {
            return await this.prismaService.tDanhMucTaiKhoan.findMany();

        } catch (error) {
            throw new ForbiddenException(`Getting all taikhoan error ${error}`)
            
        }
    }
    async getDanhMucTaiKhoanBySoTaiKhoan(soTaiKhoan){
        try {
            return await this.prismaService.tDanhMucTaiKhoan.findUnique({
                where: {
                    cTaiKhoan: soTaiKhoan
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Getting taikhoan by soTaiKhoan error ${error}`)
        }
    }
    async createTaiKhoan(insertTaiKhoanData: InsertDanhMucTaiKhoanDTO){
        try {
            const newTaiKhoan =await this.prismaService.tDanhMucTaiKhoan.create({
                data:{...insertTaiKhoanData}
            })
            return {
                message: 'Add taikhoan Successfully', 
                newTaiKhoan
            }
        } catch (error) {
            throw new ForbiddenException(`Create a new taikhoan error ${error}`)
        }
    }
    async updateTaiKhoan(updateTaiKhoanData:UpdateDanhMucTaiKhoanDTO,taiKhoan:string){
        try {
            const taiKhoanAfterUpdate = await this.prismaService.tDanhMucTaiKhoan.update({
                where:{cTaiKhoan: taiKhoan },
                data:{...updateTaiKhoanData}
            })
            return {
                message: 'Update taikhoan Successfully',
                taiKhoanAfterUpdate
            }
        }catch (error) {
            throw new ForbiddenException(`Updating taikhoan error ${error}`)
        }
    }
    async deleteTaiKhoan(taiKhoan:string) {
        try {
            const taiKhoanDeleted = await this.prismaService.tDanhMucTaiKhoan.delete({
                where:{cTaiKhoan:taiKhoan}
            })
            return {
                message: 'Delete taikhoan Successfully',
                taiKhoanDeleted
            }
        }catch (error) {
            throw new ForbiddenException(`Deleting taikhoan error ${error}`)
        }
    }
}
