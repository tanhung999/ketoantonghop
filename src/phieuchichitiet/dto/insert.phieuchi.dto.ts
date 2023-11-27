import { IsDate, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertPhieuChiDTO {
    @IsString()
    @IsNotEmpty()
    cMaChungTu: string

    @IsString()
    @IsNotEmpty()
    cLoaiChungTu: string

    @IsString()
    @IsNotEmpty()
    cSoChungTu: string

    @IsDate()
    @IsNotEmpty()
    dNgayChungTu: Date

    @IsString()
    @IsOptional()
    cHoTen?: string

    @IsString()
    @IsOptional()
    cDiaChi:string

    @IsString()
    @IsNotEmpty()
    cMaKhachHang: string

    @IsString()
    @IsNotEmpty()
    cTenKhachHang: string

    @IsString()
    @IsNotEmpty()
    cMaSoThue: string

    @IsString()
    @IsNotEmpty()
    cDienGiai: string

    @IsString()
    @IsOptional()
    cBieuThue?: string

    @IsString()
    @IsOptional()
    cSoSeRi?:string

    @IsString()
    @IsNotEmpty()
    cSoHoaDon: string

    @IsString()
    @IsNotEmpty()
    dNgayHoaDon: Date

    @IsFloat()
    @IsOptional()
    nThueSuat?:number

    @IsString()
    @IsOptional()
    cMatHang?: string
}


