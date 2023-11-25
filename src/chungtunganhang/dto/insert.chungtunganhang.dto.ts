import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class InsertChungTuNganHangDTO {
    @IsString()
    @IsNotEmpty()
    cMaChungTu: string

    @IsString()
    @IsOptional()
    cLoaiChungTu?: string

    @IsString()
    @IsDateString()
    dNgayChungTu :Date

    @IsString()
    @IsOptional()
    cSoChungTu? : string

    @IsString()
    @IsOptional()
    cHoTen?: string

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
    cDienGiai? :string

    @IsNumber()
    @IsOptional()
    nThu_Chi?: number
}