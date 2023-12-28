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
    async createdChungTuKetChuyen(_tChungTuKetChuyen:InsertChungTuKetChuyenDTO,ketChuyenChiTietData:InsertChungTuKetChuyenChiTietDTO){
      try {
          const createdChungTu = await this.prismaService.tChungTuKetChuyen.create({
            data: {
              ..._tChungTuKetChuyen,
              tChungTuKetChuyenChiTiet: {
                create: {
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
    async updateChungTuKetChuyen(
      _tChungTuKetChuyen: UpdateChungTuKetChuyenDTO,
      updateChungTuKetChuyenChiTietData:UpdateChungTuKetChuyenChiTietDTO,
      maChungTu: string,
      id:number
    ){
        try {
          const cMaChungTu = formatMaChungTu(maChungTu)
          const existingChungTu = await this.getChungTuKetChuyenByMaChungTu(maChungTu)
          if (!existingChungTu) {
              throw new NotFoundException(`ChungTu with id ${cMaChungTu} not found`);
          }
          if (!existingChungTu?.tChungTuKetChuyenChiTiet) {
            throw new NotFoundException(`ChungTu with id ${cMaChungTu} not found`);
          }
          const chungTuKetChuyenAfterUpdate= await this.prismaService.tChungTuKetChuyen.update({
            where: {cMaChungTu},
            data:{
              ..._tChungTuKetChuyen,
              tChungTuKetChuyenChiTiet: {
                update: {
                  where: {id},
                  data: {
                    ...updateChungTuKetChuyenChiTietData
                  }
                }
              }
            },
            include: {
              tChungTuKetChuyenChiTiet: true
            }
          })
          return {
            message: 'Update Success',
            data: {
              chungTuKetChuyenAfterUpdate
            }
          }
        } catch (error) {
          throw new ForbiddenException(`Error deleting chungtuketchuyen: ${error}`)
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
  

    
