import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertPhieuNhapHangTraLaiDTO {
    @IsString()
    @IsNotEmpty()
    cMaChungTu:string

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
    cDienGiai?: string
    
    @IsString()
    @IsNotEmpty()
    cMaKhachHang: string

    @IsString()
    @IsNotEmpty()
    cTenKhachHang:string

    @IsString()
    @IsNotEmpty()
    cMaSoThue: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanNoGiaVon: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanCoGiaVon: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanCoGiaBan: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanNoGiaBan: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanNoGTGT: string

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
    @IsNotEmpty()
    nThueSuat: number

    @IsFloat()
    @IsNotEmpty()
    nThueGTGT: number

    @IsString()
    @IsOptional()
    cMatHang?: string
}