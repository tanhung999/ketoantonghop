import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';
import {  InsertChungTuGhiSoDTO, UpdateChungTuGhiSoChiTietDTO, UpdateChungTuGhiSoDTO } from './dto';
import { convertMaChungTu, convertSoChungTu } from 'src/convert.sochungtu.ts';
@Injectable()
export class ChungtughisoService {  
    constructor (private prismaService: PrismaService){}
    
    async getAll(){
        return await this.prismaService.tChungTuGhiSo.findMany({
            include: {
                tChungTuGhiSoChiTiet: true
            }
        })
    }
    
    async getChungTuGhiSoBySoChungTu (soChungTu: string){
        const soChungTuConfig = convertSoChungTu(soChungTu);
        return await this.prismaService.tChungTuGhiSo.findMany({
            where: {
                cSoChungTu: soChungTuConfig
            },
            include: {
                tChungTuGhiSoChiTiet: true
            }
        })
    }
    async getChungTuGhiSo(){
        const listChungTu = await this.prismaService.tChungTuGhiSo.findMany({
            select :selectChungTu,
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
    }
    async soChungTuGhiSoNext () {
        return soChungTuNext((await this.getChungTuGhiSo()).chungTuLast)
    }
    async createdChungTuGhiSo(
            insertChungTuGhiSoDTO :InsertChungTuGhiSoDTO
        ){
            try {
                const maxId = await this.prismaService.tChungTuGhiSoChiTiet.findMany({
                    orderBy: {
                        nMaSo: 'desc'
                    },
                    take: 1
                })
            
                const idNext = maxId[0].nMaSo+1
                try {
                    const chungtughisoNew= await this.prismaService.$queryRaw`INSERT INTO tChungTuGhiSo (cMaChungTu, 
                        cLoaiChungTu, dNgayChungTu, cSoChungTu, 
                        cHoTen, cMaKhachHangNo, cTenKhachHangNo, 
                        cMaSoThueNo, cMaKhachHangCo, cTenKhachHangCo, 
                        cMaSoThueCo, cDienGiai, cBieuThue, cSoSeri, 
                        cSoHoaDon, dNgayHoaDon, nThueSuat, nThueGTGT, cMatHang)
                        VALUES (${insertChungTuGhiSoDTO.cMaChungTu}, ${insertChungTuGhiSoDTO.cLoaiChungTu}, 
                        ${insertChungTuGhiSoDTO.dNgayChungTu}, ${insertChungTuGhiSoDTO.cSoChungTu}, 
                        ${insertChungTuGhiSoDTO.cHoTen===''? null: insertChungTuGhiSoDTO.cHoTen}, 
                        ${insertChungTuGhiSoDTO.cMaKhachHangNo===''? null: insertChungTuGhiSoDTO.cMaKhachHangNo}, 
                        ${insertChungTuGhiSoDTO.cTenKhacHangNo===''? null: insertChungTuGhiSoDTO.cTenKhacHangNo},
                        ${insertChungTuGhiSoDTO.cMaSoThueNo===''? null: insertChungTuGhiSoDTO.cMaSoThueNo}, 
                        ${insertChungTuGhiSoDTO.cMaKhacHangCo},
                        ${insertChungTuGhiSoDTO.cTenKhachHangCo}, 
                        ${insertChungTuGhiSoDTO.cMaKhacHangCo}, 
                        ${insertChungTuGhiSoDTO.cDienGiai},
                        ${insertChungTuGhiSoDTO.cBieuThue}, 
                        ${insertChungTuGhiSoDTO.cSoSeri},
                        ${insertChungTuGhiSoDTO.cSoHoaDon},
                        ${insertChungTuGhiSoDTO.dNgayHoaDon},
                        ${insertChungTuGhiSoDTO.nThueSuat}, 
                        ${insertChungTuGhiSoDTO.nThueGTGT==undefined?null:insertChungTuGhiSoDTO.nThueGTGT}, 
                        ${insertChungTuGhiSoDTO.cMatHang});`
                    
                } catch (error){
                    throw new ForbiddenException(`Error creating chungtughiso: ${error}`)
                }
                try {
                    const chungtughisochitietNew = await this.prismaService.$queryRaw`
                    SET IDENTITY_INSERT tChungTuGhiSoChiTiet ON;
                    INSERT INTO tChungTuGhiSoChiTiet(
                        cMaChungTu,nMaSo,
                        cDienGiaiChiTiet,
                        nSoTien,
                        cTaiKhoanNo,
                        cTaiKhoanCo)
                    VALUES (${insertChungTuGhiSoDTO.cMaChungTu},
                        ${idNext},
                        ${insertChungTuGhiSoDTO.cDienGiaiChiTiet},
                        ${insertChungTuGhiSoDTO.nSoTien},
                        ${insertChungTuGhiSoDTO.cTaiKhoanNo},${insertChungTuGhiSoDTO.cTaiKhoanCo})`

                    return {
                        message: "Posted successfully!!!"   
                    }
                } catch (error){
                    throw new ForbiddenException(`Error creating chungtughisochitiet: ${error}`)
                }
            } catch (error) {
                throw new ForbiddenException(`Error creating chungtughisochitiet: ${error}`)
            }
            
    }
    async deletedChungTuGhiSoChiTiet(machungtu:string){
        try {
            const machungtuConfig = convertMaChungTu(machungtu)
            const result= await this.prismaService.$queryRaw`DELETE FROM tChungTuGhiSoChiTiet
                WHERE tChungTuGhiSoChiTiet.cMaChungTu =${machungtuConfig}`
            return result
        } catch (error){
            throw new ForbiddenException(`Error deleting chungtughisochitiet: ${error}`);
        }
        
    }

    async deletedChungTuGhiSo(machungtu:string){
        try {
            const machungtuConfig = convertMaChungTu(machungtu)
            const result = await this.prismaService.$queryRaw`DELETE FROM tChungTuGhiSo
                WHERE tChungTuGhiSo.cMaChungTu =${machungtuConfig}`
            return {message: 'Deleted Successfully!!!'}
        } catch (error){
            throw new ForbiddenException(`Error deleting chungtughiso: ${error}`);
        }
        
    }
    async updatedChungTuGhiSo(
        machungtu:string,
        updateChungTuGhiSo:UpdateChungTuGhiSoDTO,
    ){
        const machungtuConfig = convertMaChungTu(machungtu)
        try {
                const updatedChungTuGhiSo=await this.prismaService.tChungTuGhiSo.update({
                    where: {cMaChungTu:machungtuConfig},
                    data:updateChungTuGhiSo
                });
                
            return {message: 'Update successfully'}
            
        } catch (error){
            throw new ForbiddenException(`Error updating data: ${error}`);
        }
        
    }
    async updatedChungTuGhiSoChiTiet 
    (
        updateChungTuGhiSoChiTiet:UpdateChungTuGhiSoChiTietDTO,
        maso:number,
        machungtu:string
    ){
        try {
            const machungtuConfig = convertMaChungTu(machungtu)
            const chungTuGhiSoChiTiet = await this.prismaService.tChungTuGhiSo.findUnique({
                where: {cMaChungTu: machungtuConfig},
                include: {
                    tChungTuGhiSoChiTiet: true
                }
            });
            
            if(chungTuGhiSoChiTiet?.tChungTuGhiSoChiTiet){
                await this.prismaService.tChungTuGhiSoChiTiet.update({
                    where: {nMaSo:maso},
                    data: updateChungTuGhiSoChiTiet
                })
                return {message: 'Update successfully'}
            } else {
                return 'Create a new chungtughisochitiet'
            }
        } catch (error) {
            throw new ForbiddenException(`Update chungtughisochitiet error ${error}`)
        }
        
    }
}
