import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertPhieuNhapHangHoaDTO {
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
    cMaNguoiBan?: string

    @IsString()
    @IsOptional()
    cTenNguoiBan?:string

    @IsString()
    @IsOptional()
    cMaSoThueNguoiBan?: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanNo: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanNoGTGT: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanCo: string

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
    @IsNotEmpty()
    nThueSuat: number

    @IsFloat()
    @IsNotEmpty()
    nThueGTGT: number

    @IsString()
    @IsOptional()
    cMatHang?: string
}