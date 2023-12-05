import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';
import { convertMaChungTu } from 'src/convert.sochungtu.ts';
import { InsertPhieuNhapHangHoaChiTietDTO, InsertPhieuNhapHangHoaDTO,UpdatePhieuNhapHangHoaDTO,UpdatePhieuNhapHangHoaChiTietDTO } from './dto';

@Injectable()
export class PhieunhaphanghoaService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        try {
            return await this.prismaService.tPhieuNhapHangHoa.findMany({
                include: {
                    tPhieuNhapHangHoaChiTiet: true
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Getting all data of PhieuNhapHangHoa error ${error}`)
        }
    }
    async getPhieuNhapHangHoaByMaChungTu(maChungTu: string){
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            return await this.prismaService.tPhieuNhapHangHoa.findUnique({
                where: {
                    cMaChungTu
                },
                include: {
                    tPhieuNhapHangHoaChiTiet: true
                }
            })
        } catch (error) {
            throw new Error(`Getting a record data of PhieuNhapHangHoa error ${error}`)
        } 
    }
    async getPhieuNhapHangHoa(){
        try {
            const listChungTu = await this.prismaService.tPhieuNhapHangHoa.findMany({
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
            throw new Error(`Getting data of PhieuNhapHangHoa error ${error}`)
        }
    }
    
    async soChungTuGhiSoNext () {
        try {
            return soChungTuNext((await this.getPhieuNhapHangHoa()).chungTuLast)

        } catch(error) {
            throw new Error(`Getting SoChungTuGhiSoNext error ${error}`)
        }
    }
    async createPhieuNhapHangHoa (insertPhieuNhapHangHoaData: InsertPhieuNhapHangHoaDTO,
        insertPhieuNhapHangHoaChiTietData: InsertPhieuNhapHangHoaChiTietDTO    
    ){
        const maxMaSo = await this.prismaService.tPhieuNhapHangHoaChiTiet.findMany({
            orderBy: {
                nMaSo: 'desc'
            },
            take: 1
        })
        const nMaSo = maxMaSo[0].nMaSo + 1
        try {
            
            const phieuNhapHangHoa = await this.prismaService.tPhieuNhapHangHoa.create({
                data:{
                    ...insertPhieuNhapHangHoaData,
                    tPhieuNhapHangHoaChiTiet :{
                        create: {
                            ...insertPhieuNhapHangHoaChiTietData,
                            nMaSo
                        }
                    }
                }
            })
            return {
                message:'Create a new PhieuNhapHangHoa success',
                phieuNhapHangHoa
            }
        } catch(error) {
            throw new Error(`Create phieunhaphanghoa error ${error}`)
        }
    }
    async updatePhieuNhapHangHoa(updatePhieuNhapHangHoaData: UpdatePhieuNhapHangHoaDTO,
        updatePhieuNhapHangHoaChiTietData: UpdatePhieuNhapHangHoaChiTietDTO,
        maSo: number,
        maChungTu:string
    ){
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            const existPhieuNhapHangHoa = await this.getPhieuNhapHangHoaByMaChungTu(maChungTu)
            if(!existPhieuNhapHangHoa) return {message: `PhieuNhapHangHoa with cMaChungTu is ${cMaChungTu} not found`} 
        } catch(error){
            throw new Error(`Getting phieunhaphanghoa error ${error}`)
        }
        try {
           
            const phieuNhapHangHoaAfterUpdate = await this.prismaService.tPhieuNhapHangHoa.update({
                where: {cMaChungTu},
                data:{
                    ...updatePhieuNhapHangHoaData,
                    tPhieuNhapHangHoaChiTiet: {
                        update: {
                            where: {nMaSo: maSo},
                            data: {
                                ...updatePhieuNhapHangHoaChiTietData
                            }
                        }
                    }
                }
            })
            return {
                message:`Update phieunhaphanghoa sucessfully`,
                phieuNhapHangHoaAfterUpdate
            }
        } catch(error) {
            throw new Error(`Update phieunhaphanghoa error ${error}`)
        }
        
    }
    async deletePhieuNhapHangHoa(maChungTu:string){
        try {
            const cMaChungTu = convertMaChungTu(maChungTu)
            const existPhieuNhapHangHoa = await this.getPhieuNhapHangHoaByMaChungTu(maChungTu)
            if(!existPhieuNhapHangHoa) return {message: `PhieuNhapHangHoa with cMaChungTu is ${cMaChungTu} not found`} 
            if(existPhieuNhapHangHoa?.tPhieuNhapHangHoaChiTiet){
                await this.prismaService.tPhieuNhapHangHoaChiTiet.deleteMany({
                    where: {cMaChungTu}
                })
            }
            const deletePhieuNhapHangHoa = await this.prismaService.tPhieuNhapHangHoa.delete({
                where: {cMaChungTu}
            })
            return {
                message: {
                    code:'SUCCESS',
                    message:`Delete phieunhaphanghoa sucessfully`
                },
                deletePhieuNhapHangHoa
            }
        } catch(error) {
            throw new Error(`Delete phieunhaphanghoa error ${error}`)
        }
    }
  }