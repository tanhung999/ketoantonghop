import { IsDate, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuNhapHangHoaDTO {
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
    cMaNguoiBan?: string

    @IsString()
    @IsOptional()
    cTenNguoiBan?:string

    @IsString()
    @IsOptional()
    cMaSoThueNguoiBan?: string

    @IsString()
    @IsOptional()
    cTaiKhoanNo?: string

    @IsString()
    @IsOptional()
    cTaiKhoanNoGTGT?: string

    @IsString()
    @IsOptional()
    cTaiKhoanCo?: string

    @IsString()
    @IsOptional()
    cDienGiai?: string

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