import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
        try {
          return await this.prismaService.tChungTuKetChuyen.findMany({
            include: {
                tChungTuKetChuyenChiTiet: true
            }
          })
        } catch (error){
          throw new ForbiddenException(`Getting all data error ${error}`)
        }
    }
    async getChungTuKetChuyenByMaChungTu(maChungTu:string){
        try {
          const maChungTuConfig = formatMaChungTu(maChungTu)
          return await this.prismaService.tChungTuKetChuyen.findUnique({
              where: {
                  cMaChungTu:maChungTuConfig
              },
              include: {
                  tChungTuKetChuyenChiTiet: true
              }
          })
        } catch (error) {
          throw new ForbiddenException(`Getting a record error ${error}`)
        }
    }
    async getChungTuKetChuyen(){
      try {
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
      } catch (error) {
        throw new ForbiddenException(`Getting a list record ${error}`)
      }
        
    }
    async soChungTuGhiSoNext () {
      try {
        return soChungTuNext((await this.getChungTuKetChuyen()).chungTuLast)
        
      } catch (error) {
        throw new ForbiddenException(`Getting the next chungtu error ${error}`)
      }
    }
    async createdChungTuKetChuyen(chungTuKetChuyenData:InsertChungTuKetChuyenDTO,ketChuyenChiTietData:InsertChungTuKetChuyenChiTietDTO){
      try {
          // const { cMaChungTu, cLoaiChungTu, cSoChungTu, dNgayChungTu, cDienGiai } = chungTuKetChuyenData;
          // const { cDienGiaiChiTiet, cTaiKhoanNo, cTaiKhoanCo, nSoTien } = ketChuyenChiTietData;
          const createdChungTu = await this.prismaService.tChungTuKetChuyen.create({
            data: {
              // cMaChungTu,
              // cLoaiChungTu,
              // cSoChungTu,
              // dNgayChungTu,
              // cDienGiai,
              ...chungTuKetChuyenData,
              tChungTuKetChuyenChiTiet: {
                create: {
                  // cDienGiaiChiTiet,
                  // cTaiKhoanNo,
                  // cTaiKhoanCo,
                  // nSoTien,
                  ...ketChuyenChiTietData
                },
              },
            },
            include: {
              tChungTuKetChuyenChiTiet: true,
            },
          });
    
          return {
            message: 'Created successfully',
            createdChungTu
          }
        } catch (error) {
          console.error('Error inserting data:', error);
          throw error;
        }
    }
    async updateChungTuKetChuyen(updateChungTuKetChuyenData: UpdateChungTuKetChuyenDTO,maChungTu: string){
        try {
          const maChungTuUpdate = formatMaChungTu(maChungTu)
          const existingChungTu = await this.getChungTuKetChuyenByMaChungTu(maChungTu)
          if (!existingChungTu) {
              throw new NotFoundException(`ChungTu with id ${maChungTuUpdate} not found`);
          }
          return await this.prismaService.tChungTuKetChuyen.update({
            where: {cMaChungTu: maChungTuUpdate},
            data:{...updateChungTuKetChuyenData}
          })
        } catch (error) {
          throw new ForbiddenException(`Error deleting chungtuketchuyen: ${error}`)
        }
    }
    async updateChungTuKetChuyenChiTiet(maChungTu: string, updateChungTuKetChuyenChiTietData:UpdateChungTuKetChuyenChiTietDTO
      ,id:number) {
        try {
            const maChungTuUpdate = formatMaChungTu(maChungTu)
            const existingChungTu = await this.getChungTuKetChuyenByMaChungTu(maChungTu)
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
        } catch (error){
          throw new ForbiddenException(`Error deleting chungtuketchuyenchitiet: ${error}`)
        }
        
    }

    async deleteChungTuKetChuyen(maChungTu: string){
      try {
        const maChungTuDeleted = formatMaChungTu(maChungTu)
        const existingChungTu = await this.getChungTuKetChuyenByMaChungTu(maChungTu)
        if (!existingChungTu) {
            throw new NotFoundException(`ChungTu with id ${maChungTuDeleted} not found`);
        }
        if(existingChungTu?.tChungTuKetChuyenChiTiet) {
          await this.prismaService.tChungTuKetChuyenChiTiet.deleteMany({
            where: {cMaChungTu: maChungTuDeleted}
          })
        }
        await this.prismaService.tChungTuKetChuyen.delete({
          where: {cMaChungTu: maChungTuDeleted}
        })
        return {
          message: "Deleted Successfully"
        }
      } catch (error) {
        throw new ForbiddenException(`Deleting chungtuketchuyen error ${error}`)
      }
    }
       
}
  

    
