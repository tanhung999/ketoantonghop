import { IsDate, IsNumber, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuThuDTO {
    
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
    cHoTen?: string

    @IsString()
    @IsOptional()
    cDiaChi?: string

    @IsNumber()
    @IsOptional()
    cSoChungTuGoc?:number

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
    cDienGiai?: string

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