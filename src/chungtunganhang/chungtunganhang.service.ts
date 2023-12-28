import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cSoChungTu, dNgayChungTu, selectChungTu } from '../select';
import { getChungTuLasted } from '../getchungtulasted';
import { soChungTuNext } from '../getChungTuNext';
import { InsertChungTuNganHangChiTietDTO, InsertChungTuNganHangDTO, UpdateChungTuNganHangChiTietDTO, UpdateChungTuNganHangDTO } from './dto';
import { convertMaChungTu } from 'src/convert.sochungtu.ts';

@Injectable()
export class ChungtunganhangService {
    constructor(private prismaService: PrismaService){}
    async getAll(){
        try {
            return await this.prismaService.tChungTuNganHang.findMany({
                include: {
                    tChungTuNganHangChiTiet: true
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Getting all data error ${error}`)
        }
    }
    async getChungTuNganHangByMaChungTu(maChungTu){
        const maChungTuConfig = convertMaChungTu(maChungTu)
        try {
            return await this.prismaService.tChungTuNganHang.findUnique({
                where: {
                    cMaChungTu: maChungTuConfig
                },
                include:{
                    tChungTuNganHangChiTiet: true
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Getting a record data error ${error}`)
        }
    }
    async getChungTuNganHang(){
        try {
            const listChungTu =  await this.prismaService.tChungTuNganHang.findMany({
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
            throw new ForbiddenException(`Error ${error}`)
        }
        
    }
    
    async soChungTuGhiSoNext () {
        try {
            return soChungTuNext((await this.getChungTuNganHang()).chungTuLast)

        } catch (error) {
            throw new ForbiddenException (`Getting chungtu next error ${error}`)
        }
    }
    async createChungTuNganHang(insertChungTuNganHangData:InsertChungTuNganHangDTO,
        insertChungTuNganHangChiTietData:InsertChungTuNganHangChiTietDTO) {
            const maxMaSo = await this.prismaService.tChungTuGhiSoChiTiet.findMany({
                orderBy: {
                    nMaSo: 'desc'
                },
                take: 1
            })
            const maSoNext = maxMaSo[0].nMaSo + 1
        try {
            const chungTuNganHangNew = await this.prismaService.tChungTuNganHang.create({
                data: {
                    ...insertChungTuNganHangData,
                    tChungTuNganHangChiTiet: {
                        create: {
                            ...insertChungTuNganHangChiTietData,
                            nMaSo: maSoNext
                        }
                    }
                },
                include: {
                    tChungTuNganHangChiTiet: true
                }
                
            })
            return {
                message : "Created Successfully",
                chungTuNganHangNew
            }
        } catch (error) {
            throw new ForbiddenException(`Updating a new chungtunganhang error ${error}`);
        }
    }
    async updateChungTuNganHang(
        _tChungTuNganHang: UpdateChungTuNganHangDTO,
        maChungTu : string,
    ){
        const maChungTuNganHang = convertMaChungTu(maChungTu)
        const existingChungTu = await this.getChungTuNganHangByMaChungTu(maChungTu)
        try {
            if(!existingChungTu) {
                return {
                    message : "Chungtu with"+ maChungTuNganHang+"not found"
                }
            }
            return await this.prismaService.tChungTuNganHang.update({
                where: {cMaChungTu: maChungTuNganHang},
                data:{
                    ..._tChungTuNganHang
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Updating chungtunganhang error $${error}`)
        }
        
    }
    async updateChungTuNganHangChiTiet(
        updateChungTuNganHangChiTietData: UpdateChungTuNganHangChiTietDTO,
        maChungTu : string,
        maSo: number 
    ){
        const maChungTuNganHang = convertMaChungTu(maChungTu)
        const existingChungTu =await this.getChungTuNganHangByMaChungTu(maChungTu)
        try {
            if(existingChungTu?.tChungTuNganHangChiTiet) {
                return await this.prismaService.tChungTuNganHang.update({
                    where: {cMaChungTu: maChungTuNganHang},
                    data: {
                        tChungTuNganHangChiTiet: {
                            update : {
                                where: {nMaSo: maSo},
                                data :{
                                    ...updateChungTuNganHangChiTietData
                                }
                            }
                        }
                    }
                }
                )
            }
        } catch (error) {
            throw new ForbiddenException(`Updating chungtunganhangchitiet error ${error}`)
        }
    }

    async deleteChungTuNganHang(maChungTu: string) {
        const maChungTuNganHang = convertMaChungTu(maChungTu)
        try {
            const existingChungTu = await this.getChungTuNganHangByMaChungTu(maChungTu)
            if(existingChungTu?.tChungTuNganHangChiTiet) {
                await this.prismaService.tChungTuNganHangChiTiet.deleteMany({
                    where:{cMaChungTu: maChungTuNganHang}
                })
                
            }
            const deletedChungTu = await this.prismaService.tChungTuNganHang.delete({
                where: {cMaChungTu: maChungTuNganHang}
            })
            return  {
                deletedChungTu,
                message : 'Deleted Successfully'
            }
        } catch (error) {
            throw new ForbiddenException(`Deleting chungtunganhang error ${error}`)
        }
    }
}
