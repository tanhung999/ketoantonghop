import { BadRequestException, ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';
import { convertMaChungTu } from 'src/convert.sochungtu.ts';
import { InsertPhieuXuatChiTietDTO, InsertPhieuXuatDTO, UpdatePhieuXuatChiTietDTO, UpdatePhieuXuatDTO } from './dto';

@Injectable()
export class PhieuxuathanghoaService {
    constructor (private prismaService: PrismaService) {}
    async getAll(){
        try {
            return await this.prismaService.tPhieuXuatHangHoa.findMany({
                include: {
                    tPhieuXuatHangHoaChiTiet: true
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Getting all data error ${error}`)
        }
    }
    async getPhieuXuatHangHoaByMaChungTu(maChungTu){
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            return this.prismaService.tPhieuXuatHangHoa.findUnique({
                where: {
                    cMaChungTu
                },
                include: {
                    tPhieuXuatHangHoaChiTiet: true
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Getting data error ${error}`)
        }
        
    }
    async getPhieuXuatHangHoa(){
        try {
            const listChungTu =  await  this.prismaService.tPhieuXuatHangHoa.findMany({
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
            throw new ForbiddenException(`Get list chungtu error ${error}`)
        }
    }
    
    async soChungTuGhiSoNext () {
        try {
            return soChungTuNext((await this.getPhieuXuatHangHoa()).chungTuLast)
        } catch (error) {
            throw new ForbiddenException(`Get so chung tu next error ${error}`)
        }
        
    }
    // async hangHoaDaXuat() {
    //     try {
    //         const hangDaXuat = await this.prismaService.$queryRaw`SELECT cMaChungTuNhap, cMaHang, SUM(nSoLuong)AS 'SoLuongXuat',SUM(nThanhTienGiaVon) AS 'ThanhTien'
    //         FROM tPhieuXuatHangHoaChiTiet
    //         GROUP BY cMaChungTuNhap, cMaHang`
    //     return hangDaXuat
    //     } catch (error) {
    //         throw new ForbiddenException(`hang hoa da xuat error ${error}`)
    //     }
        
    // }
    async hangHoaDaXuat() {
        try {
            const hangDaXuat = await this.prismaService.tPhieuXuatHangHoaChiTiet.groupBy({
                by: ['cMaChungTu','cMaHang'],
                _sum:{
                    nSoLuong: true,
                    nThanhTienGiaVon: true
                }
            })
            return hangDaXuat
        } catch (error) {
            throw new ForbiddenException(`hang hoa da xuat error ${error}`)
        }
        
    }

    async createPhieuXuatHangHoa (insertPhieuXuatData: InsertPhieuXuatDTO,
        insertPhieuXuatHangHoaChiTietData: InsertPhieuXuatChiTietDTO)
    {
        try{
            const phieuXuat = await this.prismaService.tPhieuXuatHangHoa.create({
                data: {...insertPhieuXuatData,
                    tPhieuXuatHangHoaChiTiet : {
                        create: {
                            ...insertPhieuXuatHangHoaChiTietData
                        }
                    }
                }
            })
            return {
                message: 'success',
                statusCode: HttpStatus.OK,
                data: phieuXuat
            }
        }catch (error) {
            throw new ForbiddenException(`Creating PhieuXuat error ${error}`)
        }
    }

    async updatePhieuXuat (updatePhieuXuatData: UpdatePhieuXuatDTO,
        updatePhieuXuatHangHoaChiTietData : UpdatePhieuXuatChiTietDTO,
        maChungTu: string,
        id: number
    ){
        try {
            const cMaChungTu = convertMaChungTu(maChungTu)
            const existPhieuXuat = await this.getPhieuXuatHangHoaByMaChungTu(maChungTu)
            if(!existPhieuXuat) return {
                message: `PhieuXuat with MaChungTu ${maChungTu} not found`,
                statusCode: HttpStatus.NOT_FOUND,              
            }
            const phieuXuatAfterUpdate = await this.prismaService.tPhieuXuatHangHoa.update({
                where: {cMaChungTu},
                data: {
                    ...updatePhieuXuatData,
                    tPhieuXuatHangHoaChiTiet: {
                        update: {
                            where :{id},
                            data:{...updatePhieuXuatHangHoaChiTietData}
                        }
                    }
                }
            })
            return {
                message: 'Successful updated',
                statusCode: HttpStatus.OK,
                data: phieuXuatAfterUpdate
            }
        } catch (error) {
            throw new ForbiddenException(`Updating PhieuXuatHangHoa error ${error}`)
        }
    }
    async deletePhieuXuat(maChungTu:string) {
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            const existPhieuXuat = await this.getPhieuXuatHangHoaByMaChungTu(maChungTu)
            if(!existPhieuXuat) return {
                message: `PhieuXuat with MaChungTu ${maChungTu} not found`,
                statusCode: HttpStatus.NOT_FOUND,              
            }
            if(existPhieuXuat?.tPhieuXuatHangHoaChiTiet) {
                await this.prismaService.tPhieuXuatHangHoaChiTiet.deleteMany()
            }
            await this.prismaService.tPhieuXuatHangHoa.delete({
                where: {cMaChungTu}
            })
            return {
                message: 'Deleted successfully',
                statusCode: HttpStatus.OK,
            }
        } catch(error) {
            throw new BadRequestException(`Deleting PhieuXuatHangHoa error ${error}`)
        }
    }
    
}
