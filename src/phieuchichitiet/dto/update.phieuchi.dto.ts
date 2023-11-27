import { IsDate, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuChiDTO {


    @IsString()
    @IsOptional()
    cLoaiChungTu: string

    @IsString()
    @IsOptional()
    cSoChungTu: string

    @IsDate()
    @IsOptional()
    dNgayChungTu?: Date

    @IsString()
    @IsOptional()
    cHoTen?: string

    @IsString()
    @IsOptional()
    cDiaChi:string

    @IsString()
    @IsOptional()
    cMaKhachHang: string

    @IsString()
    @IsOptional()
    cTenKhachHang: string

    @IsString()
    @IsOptional()
    cMaSoThue: string

    @IsString()
    @IsOptional()
    cDienGiai: string

    @IsString()
    @IsOptional()
    cBieuThue?: string

    @IsString()
    @IsOptional()
    cSoSeRi?:string

    @IsString()
    @IsOptional()
    cSoHoaDon: string

    @IsString()
    @IsOptional()
    dNgayHoaDon: Date

    @IsFloat()
    @IsOptional()
    nThueSuat?:number

    @IsString()
    @IsOptional()
    cMatHang?: string
}