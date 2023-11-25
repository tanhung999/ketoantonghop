import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateChungTuNganHangDTO {

    @IsString()
    @IsOptional()
    cLoaiChungTu?: string

    @IsString()
    @IsDateString()
    @IsOptional()
    dNgayChungTu? :Date

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