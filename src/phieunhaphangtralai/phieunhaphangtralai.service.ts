import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from 'src/select';
import { soChungTuNext } from '../getChungTuNext';
import { getChungTuLasted } from '../getchungtulasted';
import { convertMaChungTu } from 'src/convert.sochungtu.ts';
import { InsertPhieuNhapHangTraLaiChiTietDTO, InsertPhieuNhapHangTraLaiDTO, UpdatePhieuNhapHangTraLaiChiTietDTO, UpdatePhieuNhapHangTraLaiDTO } from './dto';

@Injectable()
export class PhieunhaphangtralaiService {
    constructor (private prismaService: PrismaService){}
    async getAll(){
        try {
            return await this.prismaService.tPhieuNhapHangTraLai.findMany({
                include: {
                    tPhieuNhapHangTraLaiChiTiet: true
                }
            })
        } catch (error){
            throw new Error(`Getting all data PhieuNhapHangTraLai error ${error}`)
        }
    }
    async getPhieuNhapHangTraLaiByMaChungTu(maChungTu: string){
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            return await this.prismaService.tPhieuNhapHangTraLai.findUnique({
                where: {
                    cMaChungTu
                },
                include: {
                    tPhieuNhapHangTraLaiChiTiet: true
                }
            })
        } catch(error) {
            throw new Error(`Getting phieunhaphangtralai by ma chung tu error ${error}`)
        }
        
    }
    async getPhieuNhapHangTraLai(){
        try {
            const listChungTu = await this.prismaService.tPhieuNhapHangTraLai.findMany({
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
        } catch(error) {
            throw new Error(`Getting phieunhaphangtralai error ${error}`)
        }
    }
    async soChungTuGhiSoNext () {
        try {
            return soChungTuNext((await this.getPhieuNhapHangTraLai()).chungTuLast)
        } catch(error) {
            throw new Error(`soChungTuGhiSoNext error ${error}`)
        }
    }
    async createPhieuNhapHangHoaTraLai(insertPhieuNhapHangHoaTraLaiData: InsertPhieuNhapHangTraLaiDTO,
            insertPhieuNhapHangHoaTraLaiChiTietData: InsertPhieuNhapHangTraLaiChiTietDTO
        ){
            const maxMaSo = await this.prismaService.tPhieuNhapHangTraLaiChiTiet.findMany({
                orderBy: {
                    nMaSo: 'desc'
                },
                take: 1
            })
            const nMaSo = maxMaSo[0].nMaSo + 1
        try{
            const newPhieuNhap = await this.prismaService.tPhieuNhapHangTraLai.create({
                data:{
                    ...insertPhieuNhapHangHoaTraLaiData,
                    tPhieuNhapHangTraLaiChiTiet:{
                        create: {
                            ...insertPhieuNhapHangHoaTraLaiChiTietData,
                            nMaSo
                        }
                    }
                }
            })
            return {
                message:{
                    type:'success',
                    content:`Thêm mới thành công`, 
                },
                newPhieuNhap
            }
        } catch(error) {
            throw new Error(`create phieunhaphanghoatralai error ${error}`)
        }
    }
    async updatePhieuNhapHangTraLai(updatePhieuNhapHangHoaTraLaiData: UpdatePhieuNhapHangTraLaiDTO,
        updatePhieuNhapHangHoaTraLaiChiTietData: UpdatePhieuNhapHangTraLaiChiTietDTO,
        maChungTu:string,
        maSo:number
    ){
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            const existPhieuNhapHangTraLai = await this.getPhieuNhapHangTraLaiByMaChungTu(maChungTu)
            if(!existPhieuNhapHangTraLai) return {message: `PhieuNhapHangHoa with cMaChungTu is ${cMaChungTu} not found`} 
        } catch(error){
            throw new Error(`Getting phieunhaphangtralaierror ${error}`)
        }
        try {
            const phieuNhapHangTraLaiAfterUpdate = await this.prismaService.tPhieuNhapHangTraLai.update({
                where: {cMaChungTu},
                data: {
                    ...updatePhieuNhapHangHoaTraLaiData,
                    tPhieuNhapHangTraLaiChiTiet:{
                        update:{
                            where:{nMaSo:maSo},
                            data:{...updatePhieuNhapHangHoaTraLaiChiTietData}
                        }
                    }
                }
            })
            return {
                message:{
                    type:'success',
                    content:`Cập nhật thành công`  
                },
                phieuNhapHangTraLaiAfterUpdate
            }
        } catch (error) {
            throw new Error(`Updating phieunhaphangtralai error ${error}`)
        }
    }
    async deletePhieuNhapHangTraLai(maChungTu: string){
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            const existPhieuNhapHangTraLai = await this.getPhieuNhapHangTraLaiByMaChungTu(maChungTu)
            if(!existPhieuNhapHangTraLai) return {message: `PhieuNhapHangHoa with cMaChungTu is ${cMaChungTu} not found`} 
            if(existPhieuNhapHangTraLai?.tPhieuNhapHangTraLaiChiTiet){
                await this.prismaService.tPhieuNhapHangTraLaiChiTiet.deleteMany({
                    where:{cMaChungTu}
                })
            }
            const phieuDeleted = await this.prismaService.tPhieuNhapHangTraLai.delete({
                where: {cMaChungTu}
            })
            return {
                message:{
                    type:'success',
                    content:`Xóa thành công`
                },
                phieuDeleted
            }
        } catch(error){
            throw new Error(`Deleting phieunhaphangtralai error ${error}`)
        }
    }
}
