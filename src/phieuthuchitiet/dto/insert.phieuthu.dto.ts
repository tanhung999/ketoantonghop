import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertPhieuThuDTO {
    @IsString()
    @IsNotEmpty()
    cMaChungTu: string

    @IsString()
    @IsNotEmpty()
    cLoaiChungTu: string

    @IsDate()
    @IsNotEmpty()
    dNgayChungTu: Date

    @IsString()
    @IsNotEmpty()
    cSoChungTu: string

    @IsString()
    @IsOptional()
    cHoTen?: string

    @IsString()
    @IsOptional()
    cDiaChi?: string

    @IsNumber()
    @IsOptional()
    cSoChungTuGoc?:number

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
    cSoSeRi?: string

    @IsString()
    @IsOptional()
    cSoHoaDon?: string

    @IsDate()
    @IsOptional()
    dNgayHoaDon?: Date

    @IsFloat()
    @IsOptional()
    nThueSuat?: number

    @IsString()
    @IsOptional()
    cMatHang?: string
}