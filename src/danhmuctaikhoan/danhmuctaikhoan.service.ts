import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertDanhMucTaiKhoanDTO } from './dto';
import { UpdateDanhMucTaiKhoanDTO } from './dto';

@Injectable()
export class DanhmuctaikhoanService {
    constructor(private prismaService: PrismaService) {
    }
    async getAll(){
        try {
            return await this.prismaService.tDanhMucTaiKhoan.findMany();

        } catch (error) {
            throw new ForbiddenException(`Getting all taikhoan error ${error}`)
            
        }
    }
    async getDanhMucTaiKhoanBySoTaiKhoan(soTaiKhoan){
        try {
            return await this.prismaService.tDanhMucTaiKhoan.findUnique({
                where: {
                    cTaiKhoan: soTaiKhoan
                }
            })
        } catch (error) {
            throw new ForbiddenException(`Getting taikhoan by soTaiKhoan error ${error}`)
        }
    }
    async createTaiKhoan(insertTaiKhoanData: InsertDanhMucTaiKhoanDTO){
        try {
            const newTaiKhoan =await this.prismaService.tDanhMucTaiKhoan.create({
                data:{...insertTaiKhoanData}
            })
            return {
                message: 'Add taikhoan Successfully', 
                newTaiKhoan
            }
        } catch (error) {
            throw new ForbiddenException(`Create a new taikhoan error ${error}`)
        }
    }
    async updateTaiKhoan(updateTaiKhoanData:UpdateDanhMucTaiKhoanDTO,taiKhoan:string){
        try {
            const taiKhoanAfterUpdate = await this.prismaService.tDanhMucTaiKhoan.update({
                where:{cTaiKhoan: taiKhoan },
                data:{...updateTaiKhoanData}
            })
            return {
                message: 'Update taikhoan Successfully',
                taiKhoanAfterUpdate
            }
        }catch (error) {
            throw new ForbiddenException(`Updating taikhoan error ${error}`)
        }
    }
    async deleteTaiKhoan(taiKhoan:string) {
        try {
            const taiKhoanDeleted = await this.prismaService.tDanhMucTaiKhoan.delete({
                where:{cTaiKhoan:taiKhoan}
            })
            return {
                message: 'Delete taikhoan Successfully',
                taiKhoanDeleted
            }
        }catch (error) {
            throw new ForbiddenException(`Deleting taikhoan error ${error}`)
        }
    }
    async doiChieuSoDuNoWithSoDuCo(){
        try {
            const sumSoDu = await this.prismaService.tDanhMucTaiKhoan.aggregate({
                _sum: {
                    nSoDuNoDau: true,
                    nSoDuCoDau: true
                }, 
                where :{
                    bCoDinhKhoan: true
                }
            })
            return {
                message:'Doi chieu so du no dau và so du co dau thành công',
                statusCode: HttpStatus.OK,
                data: {
                    sumSoDu
                }
            }
        } catch (error) {
            return {
                message: `Doi chieu So Du No and So Du Co error  ${error}`,
                statusCode: HttpStatus.FAILED_DEPENDENCY
            }
        }
        
    }
    async doiChieuSoDuNoDauWithSoDuCoDauTuKhachHang(){
        try {
            const doiChieuSoDuTuKhachHang = await this.prismaService.tDanhMucTaiKhoanCongNoKhachHang.groupBy({
                by:['cTaiKhoan'],
                _sum: {
                    nSoDuNoDau: true,
                    nSoDuCoDau: true
                }
            })
            return {
                message:'Doi chieu so du no dau và so du co dau tu khách hàng success',
                statusCode: HttpStatus.OK,
                data: {doiChieuSoDuTuKhachHang}
            }
        } catch (error ) {
            return {
                message:`Doi Chieu So Du No Dau Và So Du Co Dau Tu Khach Hang Error ${error}` ,
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }
    async doiChieuTaiKhoanWithKhachHang(){
        try {
            const doiChieuSoDuTuKhachHang=await this.prismaService.$queryRaw`
            SELECT 
                CongNoKhachHang.cTaiKhoan,
                CongNoKhachHang.CongSoDuNo_KhachHang,
                CongNoKhachHang.CongSoDuCo_KhachHang,
                TaiKhoan.CongSoDuNo_TaiKhoan,
                TaiKhoan.CongSoDuCo_TaiKhoan
            FROM 
                    (SELECT 
                    cTaiKhoan,
                    SUM(nSoDuNoDau) as CongSoDuNo_KhachHang,
                    SUM(nSoDuCoDau) as CongSoDuCo_KhachHang
                    FROM 
                    tDanhMucTaiKhoanCongNoKhachHang 
                    GROUP BY 
                    cTaiKhoan) AS CongNoKhachHang
                JOIN 
                    (SELECT 
                    cTaiKhoan,
                    SUM(nSoDuNoDau) as CongSoDuNo_TaiKhoan,
                    SUM(nSoDuCoDau) as CongSoDuCo_TaiKhoan
                    FROM 
                    tDanhMucTaiKhoan
                    GROUP BY 
                    cTaiKhoan) AS TaiKhoan
                ON 
            CongNoKhachHang.cTaiKhoan = TaiKhoan.cTaiKhoan
        `;
        return {
            message:'Doi chieu so du no dau và so du co dau tu khách hàng success',
            statusCode: HttpStatus.OK,
            data: {doiChieuSoDuTuKhachHang}
        }
        } catch (error) {
            return {
                message:`Doi Chieu TaiKhoan KhachHang Error ${error}` ,
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }
    async doiChieuSoDuTaiKhoanWithTongThanhTienTonHangHoa(){
        try {
            const sumThanhTienTonHangHoa = await this.prismaService.tDanhMucHangHoa.aggregate({
                _sum:{nThanhTienTonDau:true}
            });
            const soDuTaiKhoanHangHoa = await this.prismaService.tDanhMucTaiKhoan.groupBy({
                by:['cTaiKhoan'],
                _sum:{nSoDuNoDau:true},
                where: {cTaiKhoan:'156'}
            });
            const doiChieuSumAndSoDu = {
                sumThanhTienTonHangHoa,
                soDuTaiKhoanHangHoa
            }
            return {
                message:'Sucess',
                statusCode: HttpStatus.OK,
                data: doiChieuSumAndSoDu
            }
        }catch (error){
            return {
                message:`So Du Tai Khoan Hang Hoa Error And Tong Thanh Tien Hang Hoa ${error}` ,
                statusCode:HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
        
    }
}
