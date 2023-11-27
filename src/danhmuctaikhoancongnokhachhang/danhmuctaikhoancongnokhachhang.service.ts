import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertTaiKhoanCongNoKhachHangDTO, UpdateTaiKhoanCongNoKhachHangDTO } from './dto';
@Injectable()
export class DanhmuctaikhoancongnokhachhangService {
    constructor (private prismaService : PrismaService){}
    async getAll(){
        try {
            return await this.prismaService.tDanhMucTaiKhoanCongNoKhachHang.findMany() 
        } catch (error) {
            throw new ForbiddenException(`Getting all data error ${error}`)
        }
    } 
    async  getDanhMucKhachHangByMaKhachHang(cMaKhachHang: string,cTaiKhoan:string) {
        try {
            return await this.prismaService.tDanhMucTaiKhoanCongNoKhachHang.findUnique({
                where: {
                    cTaiKhoan_cMaKhachHang: {
                        cMaKhachHang,
                        cTaiKhoan
                    }
                }
            })
        } catch(error) {
            throw new ForbiddenException(`Getting a record error ${error}`)
        }
    }
    async createDanhMucTaiKhoanCongNoKhachHang(insertTaiKhoanCongNoKhachHangData : InsertTaiKhoanCongNoKhachHangDTO) {
        try {
            const taiKhoanNew = await this.prismaService.tDanhMucTaiKhoanCongNoKhachHang.create({
                data: {
                    ...insertTaiKhoanCongNoKhachHangData
                }
                
            })
            return {
                message :"Create a new taikhoancongnokhachhang successfully",
                taiKhoanNew
            }
        } catch (error) {
            throw new ForbiddenException(`Creating a new taikhoancongnokhachhang error ${error}`)
        }
    }
    async updateDanhMucTaiKhoanCongNoKhachHang (updateDanhMucTaiKhoanCongNoKhachHangData:UpdateTaiKhoanCongNoKhachHangDTO,
        cMaKhachHang: string,cTaiKhoan:string){
        try {
            const existTaiKhoanCongNoKhachHang = await this.getDanhMucKhachHangByMaKhachHang(cMaKhachHang,cTaiKhoan)
            if(!existTaiKhoanCongNoKhachHang) return 'Tai khoan not found'
        } catch (error) {
            throw new ForbiddenException(`Error ${error}`)
        }
        try {
            const taiKhoanCongNoAfterUpdated = await this.prismaService.tDanhMucTaiKhoanCongNoKhachHang.update({
                where: {
                    cTaiKhoan_cMaKhachHang: {
                        cMaKhachHang,
                        cTaiKhoan
                    }
                },
                data :{...updateDanhMucTaiKhoanCongNoKhachHangData}
            }) 
            return {
                message:"Update danhmuctaikonkhachhang successfullly",
                taiKhoanCongNoAfterUpdated
            }
        } catch(error) {
            throw new ForbiddenException(`Updating a record error ${error}`)
        }
    }
    async deleteTaiKhoanCongNo(cMaKhachHang :string, cTaiKhoan:string){
        try {
            const taiKhoanCongNoDeleted = await this.prismaService.tDanhMucTaiKhoanCongNoKhachHang.delete({
                where:{cTaiKhoan_cMaKhachHang:{
                    cMaKhachHang,
                    cTaiKhoan
                }}
            })
            return {
                message : "Delete a record of tai khoan cong no khach hang successfully",
                taiKhoanCongNoDeleted
            }
        }catch(error) {
            throw new ForbiddenException(`Deleting a record error ${error}`)
        }
    }
}
