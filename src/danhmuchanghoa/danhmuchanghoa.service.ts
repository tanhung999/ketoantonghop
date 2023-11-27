import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertHangHoaDTO, UpdateHangHoaDTO } from './dto';
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
    async createHangHoa(insertHangHoaData: InsertHangHoaDTO){
        try {
            const hangHoaNew =  await this.prismaService.tDanhMucHangHoa.create({
                data: {...insertHangHoaData}
            })
            return {
                message:'Add hanghoa new successfully',
                hangHoaNew
            }
        } catch (error) {
            throw new ForbiddenException(`Adding hanghoa error ${error}`)
        }
    }
    async updateHangHoa(updateHangHoaData: UpdateHangHoaDTO,maHang: string) {
        try {
            const hangHoaAfterUpdate = await this.prismaService.tDanhMucHangHoa.update({
                where :{cMaHang: maHang},
                data :{
                    ...updateHangHoaData
                }
            }) 
            return {
                message : 'Update hanghoa Successfully',
                hangHoaAfterUpdate
            }
        } catch (error) {
            throw new ForbiddenException(`Updating hanghoa error ${error}`)
        }  
    }
    async deleteHangHoa(maHang:string) {
        try {
            const hangHoaAfterDeleted = await this.prismaService.tDanhMucHangHoa.delete({
                where: {
                    cMaHang: maHang
                }
            })
            return {
                message : 'Delete hanghoa Successfully',
                hangHoaAfterDeleted                
            }
        } catch (error) {
            throw new ForbiddenException(`Deleting hanghoa error ${error}`)
        }
    }
}
