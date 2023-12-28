import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertDanhMucKhachHangDTO, UpdateDanhMucKhachHangDTO } from './dto';
// import { InsertDanhMucKhachHangDTO } from './dto';
// import { UpdateDanhMucKhachHangDTO } from './dto';

@Injectable()
export class DanhmuckhachhangService {
    constructor(private prismaService: PrismaService) {
    }
    async getAll(){
        try {
            return await this.prismaService.tDanhMucKhachHang.findMany();

        } catch (error) {
            throw new ForbiddenException(`Getting all khachhang error ${error}`)
            
        }
    }
    async getDanhMucKhachHangByMaKhachHang(cMaKhachHang:string){
        try {
            return await this.prismaService.tDanhMucKhachHang.findUnique({
                where: {
                    cMaKhachHang
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Getting khachhang by MaKhachHang error ${error}`)
        }
    }
    async createKhachHang(insertKhachHangData: InsertDanhMucKhachHangDTO){
        try {
            const newKhachHang =await this.prismaService.tDanhMucKhachHang.create({
                data:{...insertKhachHangData}
            })
            return {
                message: 'Add KhachHang Successfully', 
                newKhachHang
            }
        } catch (error) {
            throw new ForbiddenException(`Create a new khachhang error ${error}`)
        }
    }
    async updateKhachHang(_tDanhMucKhachHang:UpdateDanhMucKhachHangDTO,cMaKhachHang:string){
        try {
            const KhachHangAfterUpdate = await this.prismaService.tDanhMucKhachHang.update({
                where:{cMaKhachHang },
                data:{..._tDanhMucKhachHang}
            })
            return {
                message: 'Update KhachHang Successfully',
                KhachHangAfterUpdate
            }
        }catch (error) {
            throw new ForbiddenException(`Updating KhachHang error ${error}`)
        }
    }
    async deleteKhachHang(cMaKhachHang:string) {
        try {
            const KhachHangDeleted = await this.prismaService.tDanhMucKhachHang.delete({
                where:{cMaKhachHang}
            })
            return {
                message: 'Delete KhachHang Successfully',
                KhachHangDeleted
            }
        }catch (error) {
            throw new ForbiddenException(`Deleting KhachHang error ${error}`)
        }
    }
    // async doiChieuSoDuNoWithSoDuCo(){
    //     try {
    //         const sumSoDu = await this.prismaService.tDanhMucKhachHang.aggregate({
    //             _sum: {
    //                 nSoDuNoDau: true,
    //                 nSoDuCoDau: true
    //             }, 
    //             where :{
    //                 bCoDinhKhoan: true
    //             }
    //         })
    //         return {
    //             message:'Doi chieu so du no dau và so du co dau thành công',
    //             statusCode: HttpStatus.OK,
    //             data: {
    //                 sumSoDu
    //             }
    //         }
    //     } catch (error) {
    //         return {
    //             message: `Doi chieu So Du No and So Du Co error  ${error}`,
    //             statusCode: HttpStatus.FAILED_DEPENDENCY
    //         }
    //     }
        
    // }
    // async doiChieuSoDuNoDauWithSoDuCoDauTuKhachHang(){
    //     try {
    //         const doiChieuSoDuTuKhachHang = await this.prismaService.tDanhMucKhachHangCongNoKhachHang.groupBy({
    //             by:['cKhachHang'],
    //             _sum: {
    //                 nSoDuNoDau: true,
    //                 nSoDuCoDau: true
    //             }
    //         })
    //         return {
    //             message:'Doi chieu so du no dau và so du co dau tu khách hàng success',
    //             statusCode: HttpStatus.OK,
    //             data: {doiChieuSoDuTuKhachHang}
    //         }
    //     } catch (error ) {
    //         return {
    //             message:`Doi Chieu So Du No Dau Và So Du Co Dau Tu Khach Hang Error ${error}` ,
    //             statusCode:HttpStatus.INTERNAL_SERVER_ERROR
    //         }
    //     }
    // }
    // async doiChieuKhachHangWithKhachHang(){
    //     try {
    //         const doiChieuSoDuTuKhachHang=await this.prismaService.$queryRaw`
    //         SELECT 
    //             CongNoKhachHang.cKhachHang,
    //             CongNoKhachHang.CongSoDuNo_KhachHang,
    //             CongNoKhachHang.CongSoDuCo_KhachHang,
    //             KhachHang.CongSoDuNo_KhachHang,
    //             KhachHang.CongSoDuCo_KhachHang
    //         FROM 
    //                 (SELECT 
    //                 cKhachHang,
    //                 SUM(nSoDuNoDau) as CongSoDuNo_KhachHang,
    //                 SUM(nSoDuCoDau) as CongSoDuCo_KhachHang
    //                 FROM 
    //                 tDanhMucKhachHangCongNoKhachHang 
    //                 GROUP BY 
    //                 cKhachHang) AS CongNoKhachHang
    //             JOIN 
    //                 (SELECT 
    //                 cKhachHang,
    //                 SUM(nSoDuNoDau) as CongSoDuNo_KhachHang,
    //                 SUM(nSoDuCoDau) as CongSoDuCo_KhachHang
    //                 FROM 
    //                 tDanhMucKhachHang
    //                 GROUP BY 
    //                 cKhachHang) AS KhachHang
    //             ON 
    //         CongNoKhachHang.cKhachHang = KhachHang.cKhachHang
    //     `;
    //     return {
    //         message:'Doi chieu so du no dau và so du co dau tu khách hàng success',
    //         statusCode: HttpStatus.OK,
    //         data: {doiChieuSoDuTuKhachHang}
    //     }
    //     } catch (error) {
    //         return {
    //             message:`Doi Chieu KhachHang KhachHang Error ${error}` ,
    //             statusCode:HttpStatus.INTERNAL_SERVER_ERROR
    //         }
    //     }
    // }
    // async doiChieuSoDuKhachHangWithTongThanhTienTonHangHoa(){
    //     try {
    //         const sumThanhTienTonHangHoa = await this.prismaService.tDanhMucHangHoa.aggregate({
    //             _sum:{nThanhTienTonDau:true}
    //         });
    //         const soDuKhachHangHangHoa = await this.prismaService.tDanhMucKhachHang.groupBy({
    //             by:['cKhachHang'],
    //             _sum:{nSoDuNoDau:true},
    //             where: {cKhachHang:'156'}
    //         });
    //         const doiChieuSumAndSoDu = {
    //             sumThanhTienTonHangHoa,
    //             soDuKhachHangHangHoa
    //         }
    //         return {
    //             message:'Sucess',
    //             statusCode: HttpStatus.OK,
    //             data: doiChieuSumAndSoDu
    //         }
    //     }catch (error){
    //         return {
    //             message:`So Du Tai Khoan Hang Hoa Error And Tong Thanh Tien Hang Hoa ${error}` ,
    //             statusCode:HttpStatus.INTERNAL_SERVER_ERROR
    //         }
    //     }
        
    // }
}
