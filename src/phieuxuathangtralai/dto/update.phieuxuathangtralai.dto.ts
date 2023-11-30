import { IsDate, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuXuatHangTraLaiDTO {
    @IsString()
    @IsOptional()
    cMaChungTu?: string

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
    cTenKhachHang?: string

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
    cTaiKhoanNoGiaMua?: string

    @IsString()
    @IsOptional()
    cTaiKhoanCoGiaMua?: string

    @IsString()
    @IsOptional()
    cTaiKhoanCoGTGT?: string

    @IsString()
    @IsOptional()
    cBieuThue?: string

    @IsString()
    @IsOptional()
    cSoSeri?: string
   
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