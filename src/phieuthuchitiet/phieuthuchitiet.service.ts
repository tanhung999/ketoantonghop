import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { soChungTuNext } from '../getChungTuNext';
import { getChungTuLasted } from '../getchungtulasted';
import { convertMaChungTu } from 'src/convert.sochungtu.ts';
import { InsertPhieuThuChiTietDTO, InsertPhieuThuDTO, UpdatePhieuThuChiTietDTO, UpdatePhieuThuDTO } from './dto';

@Injectable()
export class PhieuthuchitietService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        try {
            const phieuThuChiTiet = await this.prismaService.tPhieuThu.findMany({
                include: {
                    tPhieuThuChiTiet: true
                }
            })
            return phieuThuChiTiet
        } catch(error) {
            throw new Error(`Getting data error ${error}`)
        }
    }
    async getPhieuThuByMaChungTu(maChungTu){
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            const phieuThu= await this.prismaService.tPhieuThu.findUnique({
                where: {
                    cMaChungTu
                },
                include: {
                    tPhieuThuChiTiet: true
                }
            })
            // let tongSoTien = 0
            // phieuThu.map(e=>{
            //     e.tPhieuThuChiTiet.map(obj =>{
            //         tongSoTien+=obj.nSoTien
            //     })
            // })
            // phieuThu[''].TongSoTien = tongSoTien
            return phieuThu
        } catch(error){
            throw new ForbiddenException(`Getting a record PhieuThu error ${error}`)
        }   
    }
    async getChungTuPhieuThu (){
        try {
            const listChungTu =  await this.prismaService.tPhieuThu.findMany({
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
        } catch(error){
            throw new ForbiddenException(`Getting List PhieuThu error ${error}`)
        }
        
    }
    async soChungTuGhiSoNext () {
        try {
            return soChungTuNext((await this.getChungTuPhieuThu()).chungTuLast)
        } catch (error) {
            throw new ForbiddenException(`Get So Chung Tu next Error ${error}`)
        }
    }
    async createPhieuThu (insertPhieuThuData: InsertPhieuThuDTO,
        insertPhieuThuChiTietData: InsertPhieuThuChiTietDTO    
    ){
        try {
            const phieuThuNew = await this.prismaService.tPhieuThu.create({
                data: {
                    ...insertPhieuThuData,
                    tPhieuThuChiTiet: {
                        create: {
                            ...insertPhieuThuChiTietData
                        }
                    }
                }
            })
            return {
                message: 'Create Success',
                statusCode: HttpStatus.OK,
                data: phieuThuNew,
            }
        } catch(error) {
            throw new ForbiddenException(`Create Phieu Thu error ${error}`)
        }
        
    }
    async updatePhieuThu(_tPhieuThu: UpdatePhieuThuDTO,
        updatePhieuThuChiTietData: UpdatePhieuThuChiTietDTO,
        maChungTu : string,
        id:number
    ) {
        const cMaChungTu = convertMaChungTu(maChungTu)
        try {
            const existPhieuThu = await this.getPhieuThuByMaChungTu(maChungTu)
            if(!existPhieuThu) return `PhieuThu with ${cMaChungTu} not found`
            const  phieuThuAfterUpdate = await this.prismaService.tPhieuThu.update({
                where:{cMaChungTu},
                data:{
                    ..._tPhieuThu,
                    tPhieuThuChiTiet: {
                        update: {
                            where : {id},
                            data: {...updatePhieuThuChiTietData}
                        }
                    }
                }
            })
            return {
                message: 'Update Success',
                statusCode: HttpStatus.OK,
                data: phieuThuAfterUpdate,

            }
        } catch(error) {
            throw new ForbiddenException(`Update Phieu Thu error ${error}`)
        }
    }
    async deletePhieuThu(maChungTu:string) {
        const cMaChungTu = convertMaChungTu(maChungTu)
        try{
            const existPhieuThu = await this.getPhieuThuByMaChungTu(maChungTu)
            if(!existPhieuThu) return `PhieuThu with ${cMaChungTu} not found`
            if(existPhieuThu?.tPhieuThuChiTiet){
                await this.prismaService.tPhieuThuChiTiet.deleteMany()
            }
            await this.prismaService.tPhieuThu.delete({
                where:{cMaChungTu}
            })
            return {
                message:'Delete success' ,
                statusCode:HttpStatus.OK,

            }
        } catch(error){
            throw new ForbiddenException(`Deleting PhieuThu error ${error}`)
        }
    }
}
