import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { soChungTuNext } from '../getChungTuNext';
import { getChungTuLasted } from '../getchungtulasted';
import { convertMaChungTu } from 'src/convert.sochungtu.ts';
import { InsertPhieuXuatHangTraLaiChiTietDTO, InsertPhieuXuatHangTraLaiDTO, UpdatePhieuXuatHangTraLaiChiTietDTO, UpdatePhieuXuatHangTraLaiDTO } from './dto';

@Injectable()
export class PhieuxuathangtralaiService {
    constructor (private prismaService: PrismaService){}
    async getAll() {
        try {
            return await this.prismaService.tPhieuXuatHangTraLai.findMany({
                include:{
                    tPhieuXuatHangTraLaiChiTiet: true
                }
            })
        } catch(error) {
            throw new ForbiddenException(`Getting all data error ${error}`)
        }
        
    }
    async getPhieuXuatHangTraLaiByMaChungTu(maChungTu : string){
        const cMaChungTu = convertMaChungTu(maChungTu)
        return this.prismaService.tPhieuNhapHangTraLai.findUnique({
            where: {
                cMaChungTu
            },
            include: {
                tPhieuNhapHangTraLaiChiTiet: true
            }
        })
    }
    async getPhieuXuatHangTraLai(){
        try {
            const listChungTu =  await  this.prismaService.tPhieuXuatHangTraLai.findMany({
                select:selectChungTu,
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
        } catch (error) {
            throw new ForbiddenException(`Getting list phieu xuat hang tra lai error ${error}`)
        }
        
    }
    
    async soChungTuGhiSoNext () {
        try {
            return soChungTuNext((await this.getPhieuXuatHangTraLai()).chungTuLast)
        } catch (error) {
            throw new ForbiddenException(`Getting next number of Chung Tu error ${error}`)
        }
    }
    // async hangHoaTraLai(){
    //     return await this.prismaService.$queryRaw`SELECT cMaChungTuNhap,cMaHang, SUM(nSoLuong) AS 'SoLuong', SUM(nThanhTienGiaVon) AS 'ThanhTienGiaVon'
    //     FROM tPhieuXuatHangTraLaiChiTiet
    //     GROUP BY cMaChungTuNhap,cMaHang`
    // }

    async hangHoaTraLai(){
        try {
            const hangTraLai =  await this.prismaService.tPhieuXuatHangTraLaiChiTiet.groupBy({
                by: ['cMaChungTuNhap','cMaHang'],
                _sum: {
                    nSoLuong: true,
                    nThanhTienGiaVon: true
                }
            })
            return {
                message: 'success',
                data:hangTraLai,
            }
        } catch (error) {
            throw new ForbiddenException(`Get list hang tra lai error ${error}`)
        }
        
    }
    async createPhieuXuatHangTraLai(insertPhieuXuatHangTraLaiData: InsertPhieuXuatHangTraLaiDTO,
        insertPhieuXuatHangTraLaiChiTietData: InsertPhieuXuatHangTraLaiChiTietDTO    
    ){
        try {
            const phieuXuatHangTraLai = await this.prismaService.tPhieuXuatHangTraLai.create({
                data: {
                    ...insertPhieuXuatHangTraLaiData,
                    tPhieuXuatHangTraLaiChiTiet: {
                        create: {
                            ...insertPhieuXuatHangTraLaiChiTietData,
                        }
                    }
                }
            })
            return {
                message:'success',
                statusCode: HttpStatus.OK,
                data:phieuXuatHangTraLai,

            }
        }catch (error) {
            throw new ForbiddenException(`Create Phieu Xuat Hang Tra Lai error ${error}`)
        }
    }
    async updatePhieuXuatHangTraLai (updatePhieuXuatHangTraLaiData: UpdatePhieuXuatHangTraLaiDTO,
        updatePhieuXuatHangTraLaiChiTietData : UpdatePhieuXuatHangTraLaiChiTietDTO,
        maChungTu: string,
        nMaSo: number
    ) {
        const cMaChungTu = convertMaChungTu(maChungTu)
        
        try {
            const existPhieuXuat = await this.getPhieuXuatHangTraLaiByMaChungTu(maChungTu)
            if(!existPhieuXuat) return {
                message: `PhieuXuatHangTraLai with ${cMaChungTu} Not found`,
                statusCode: HttpStatus.NOT_FOUND
            }
            const phieuXuatAfterUpdate = await this.prismaService.tPhieuXuatHangTraLai.update({
                where:{cMaChungTu},
                data:{
                    ...updatePhieuXuatHangTraLaiData,
                    tPhieuXuatHangTraLaiChiTiet: {
                        update:{
                            where: {nMaSo},
                            data:{
                                ...updatePhieuXuatHangTraLaiChiTietData
                            }
                        }
                    }
                }
            }) 
            return {
                message:'success',
                statusCode: HttpStatus.OK,
                data:phieuXuatAfterUpdate,
            }
        } catch (error) {
            throw new ForbiddenException(`Update Phieu Xuat Hang Tra Lai error ${error}`)
            
        }
        
    }
    async deletePhieuXuatHangTraLai(maChungTu : string){
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            const existPhieuXuat = await this.getPhieuXuatHangTraLaiByMaChungTu(maChungTu)
            if(!existPhieuXuat) return {
                message: `PhieuXuatHangTraLai with ${cMaChungTu} Not found`,
                statusCode: HttpStatus.NOT_FOUND
            }
            if(existPhieuXuat?.tPhieuNhapHangTraLaiChiTiet) {
                await this.prismaService.tPhieuXuatHangTraLaiChiTiet.deleteMany()
            }
            await this.prismaService.tPhieuXuatHangTraLai.delete({
                where: {cMaChungTu}
            })
        } catch(error) {
            throw new ForbiddenException(`Deleting error ${error}`)
        }
    }
}
