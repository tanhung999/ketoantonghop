import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuNhapHangTraLaiDTO {

    @IsString()
    @IsOptional()
    cLoaiChungTu?: string

    @IsDate()
    @IsOptional()
    dNgayChungTu?: Date

    @IsString()
    @IsOptional()
    cSoChungTu?: string

    @IsString()
    @IsOptional()
    cDienGiai?: string
    
    @IsString()
    @IsOptional()
    cMaKhachHang?: string

    @IsString()
    @IsOptional()
    cTenKhachHang?:string

    @IsString()
    @IsOptional()
    cMaSoThue?: string

    @IsString()
    @IsOptional()
    cTaiKhoanNoGiaVon?: string

    @IsString()
    @IsOptional()
    cTaiKhoanCoGiaVon?: string

    @IsString()
    @IsOptional()
    cTaiKhoanCoGiaBan?: string

    @IsString()
    @IsOptional()
    cTaiKhoanNoGiaBan?: string

    @IsString()
    @IsOptional()
    cTaiKhoanNoGTGT?: string

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

    @IsFloat()
    @IsOptional()
    nThueGTGT?: number

    @IsString()
    @IsOptional()
    cMatHang?: string
}