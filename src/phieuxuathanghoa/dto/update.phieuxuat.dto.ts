import { IsDate, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuXuatDTO {

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
    cTaiKhoanNoGiaBan?: string

    @IsString()
    @IsOptional()
    cTaiKhoanCoGiaBan?: string

    @IsString()
    @IsOptional()
    cTaiKhoanCoGTGT?: string

    @IsString()
    @IsOptional()
    cDienGiai?: string

    @IsString()
    @IsOptional()
    cMatHang?: string

    @IsFloat()
    @IsOptional()
    nThueSuat?: number

    @IsFloat()
    @IsOptional()
    nThueGTGT?: number

    @IsString()
    @IsOptional()
    cSoSeri?: string

    @IsString()
    @IsOptional()
    cSoHoaDon?: string
}