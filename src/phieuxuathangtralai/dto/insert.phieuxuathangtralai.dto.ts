import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsFloat } from "../../chungtughiso/dto/decorator.dto";

export class InsertPhieuXuatHangTraLaiDTO {
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
    @IsNotEmpty()
    cTaiKhoanNoGiaVon: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanCoGiaVon: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanNoGiaMua: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanCoGiaMua: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanCoGTGT: string

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
    dNgayHoaDon: Date

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