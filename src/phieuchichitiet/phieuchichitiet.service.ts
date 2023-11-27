import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';
import { convertMaChungTu } from 'src/convert.sochungtu.ts';
import { InsertPhieuChiChiTietDTO, InsertPhieuChiDTO, UpdatePhieuChiChiTietDTO, UpdatePhieuChiDTO } from './dto';

@Injectable()
export class PhieuchichitietService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        try {
            const allDataPhieuChiChiTiet = await this.prismaService.tPhieuChi.findMany({
                include: {
                    tPhieuChiChiTiet: true
                }
            })
            return allDataPhieuChiChiTiet
        }catch (error) {
            throw new ForbiddenException(`Getting all data of PhieuChi error ${error}`)
        }
        
    }
    async getPhieuChiByMaChungTu(maChungTu) {
        const cMaChungTu = convertMaChungTu(maChungTu);
        try {
            return await this.prismaService.tPhieuChi.findUnique({
                where: {
                    cMaChungTu
                },
                include :{
                    tPhieuChiChiTiet: true
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Getting a new record of PhieuChi error ${error}`)
        }
        
    }
    async getChungTuPhieuChi (){
        try {
            const listChungTu = await this.prismaService.tPhieuChi.findMany({
                select: selectChungTu,
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
        } catch (error){
            throw new ForbiddenException(`Error getting ${error}`)
        }
        
    }
    
    async soChungTuGhiSoNext () {
        try {
            return soChungTuNext((await this.getChungTuPhieuChi()).chungTuLast)
        } catch (error) {
            throw new ForbiddenException(`Error getting next So Chung Tu ${error}`)
        }
    }
    async createPhieuChi (insertPhieuChiData: InsertPhieuChiDTO,insertPhieuChiChiTietData: InsertPhieuChiChiTietDTO){
        try {
            const newPhieuChi = await this.prismaService.tPhieuChi.create({
                data:{
                    ...insertPhieuChiData,
                    tPhieuChiChiTiet: {
                        create: {
                            ...insertPhieuChiChiTietData
                        }
                    }
                }
            })
            return  {
                message: 'Create phieuchi success',
                newPhieuChi
            }
        } catch (error ){
            throw new ForbiddenException(`Creating a new PhieuThu error ${error}`)
        }
    }
    async updatePhieuChi (
        updatePhieuChiData: UpdatePhieuChiDTO,
        updatePhieuChiChiTietData: UpdatePhieuChiChiTietDTO,
        maChungTu: string,
        id:number
    ){
        const existPhieuChi = await this.getPhieuChiByMaChungTu(maChungTu)
        if(!existPhieuChi) return 'PhieuChi update not found'
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            const phieuChiAfterUpdate = await this.prismaService.tPhieuChi.update({
                where : {cMaChungTu},
                data:{
                    ...updatePhieuChiData,
                    tPhieuChiChiTiet:{
                        update: {
                            where : {id},
                            data:{...updatePhieuChiChiTietData}
                        }
                    }
                }
            })
            return {
                message:'Updating phieuchi success',
                phieuChiAfterUpdate
            }
        } catch (error) {
            throw new ForbiddenException(`Updating phieuchi eror ${error}`)
        }
        
    }
    async deletePhieuChi (maChungTu:string) {
        const existPhieuChi = await this.getPhieuChiByMaChungTu(maChungTu)
        if(!existPhieuChi) return 'PhieuChi update not found'
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            if(existPhieuChi?.tPhieuChiChiTiet) {
                await this.prismaService.tPhieuChiChiTiet.deleteMany({
                    where :{cMaChungTu}
                })
            }
            await this.prismaService.tPhieuChi.delete({
                where: {cMaChungTu}
            })
        } catch (error) {
            throw new ForbiddenException(`Deleting phieuchi error ${error}`)
        }
    }
}
