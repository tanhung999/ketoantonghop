import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { soChungTuNext } from '../getChungTuNext';
import {  cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { InsertChungTuKetChuyenChiTietDTO, InsertChungTuKetChuyenDTO, UpdateChungTuKetChuyenChiTietDTO, UpdateChungTuKetChuyenDTO } from './dto';
import { formatMaChungTu } from './handlemachungtu';

@Injectable()
export class ChungtuketchuyenService {
    constructor (private prismaService: PrismaService){}
    async getAll(){
        return await this.prismaService.tChungTuKetChuyen.findMany({
            include: {
                tChungTuKetChuyenChiTiet: true
            }
        })
    }
    async getChungTuKetChuyenByMaChungTu(maChungTu){
        const maChungTuFirstCut = maChungTu.substr(0,9)
        const maChungTuLastCut = maChungTu.substr(10)
        const maChungTuConfig = maChungTuFirstCut+'/'+maChungTuLastCut
        console.log(maChungTuConfig)
        return await this.prismaService.tChungTuKetChuyen.findMany({
            where: {
                cMaChungTu:maChungTuConfig
            },
            include: {
                tChungTuKetChuyenChiTiet: true
            }
        })
    }
    async getChungTuKetChuyen(){
        const listChungTu = await this.prismaService.tChungTuKetChuyen.findMany({
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
        return soChungTuNext((await this.getChungTuKetChuyen()).chungTuLast)
    }
    async createdChungTuKetChuyen(chungTuKetChuyenData:InsertChungTuKetChuyenDTO,ketChuyenChiTietData:InsertChungTuKetChuyenChiTietDTO){
        
      try {
          const { cMaChungTu, cLoaiChungTu, cSoChungTu, dNgayChungTu, cDienGiai } = chungTuKetChuyenData;
          const { cDienGiaiChiTiet, cTaiKhoanNo, cTaiKhoanCo, nSoTien } = ketChuyenChiTietData;
    
          const createdChungTu = await this.prismaService.tChungTuKetChuyen.create({
            data: {
              cMaChungTu,
              cLoaiChungTu,
              cSoChungTu,
              dNgayChungTu,
              cDienGiai,
              tChungTuKetChuyenChiTiet: {
                create: {
                  cDienGiaiChiTiet,
                  cTaiKhoanNo,
                  cTaiKhoanCo,
                  nSoTien,
                },
              },
            },
            include: {
              tChungTuKetChuyenChiTiet: true,
            },
          });
    
          return createdChungTu;
        } catch (error) {
          console.error('Error inserting data:', error);
          throw error;
        }
    }
    async updateChungTuKetChuyen(updateChungTuKetChuyenData: UpdateChungTuKetChuyenDTO,maChungTu: string){
        const maChungTuUpdate = formatMaChungTu(maChungTu)
        const existingChungTu = await this.prismaService.tChungTuKetChuyen.findUnique({
          where: {cMaChungTu: maChungTuUpdate}
        });
        if (!existingChungTu) {
            throw new NotFoundException(`ChungTu with id ${maChungTuUpdate} not found`);
        }
        return await this.prismaService.tChungTuKetChuyen.update({
          where: {cMaChungTu: maChungTuUpdate},
          data:{...updateChungTuKetChuyenData}
        })
    }
    async updateChungTuKetChuyenChiTiet(maChungTu: string, updateChungTuKetChuyenChiTietData:UpdateChungTuKetChuyenChiTietDTO
      ,id:number) {
        const maChungTuUpdate = formatMaChungTu(maChungTu)
        const existingChungTu = await this.prismaService.tChungTuKetChuyen.findUnique({
          where: {cMaChungTu: maChungTuUpdate},
          include: {tChungTuKetChuyenChiTiet:true}
        });
        if (!existingChungTu?.tChungTuKetChuyenChiTiet) {
            throw new NotFoundException(`ChungTu with id ${maChungTuUpdate} not found`);
        }
        return await this.prismaService.tChungTuKetChuyen.update({
          where:{cMaChungTu:maChungTuUpdate},
          data:{
            tChungTuKetChuyenChiTiet:{
              update:{
                where: {id:id},
                data: {...updateChungTuKetChuyenChiTietData}
              }
            }
          }
        })
    }
       
}
  

    
