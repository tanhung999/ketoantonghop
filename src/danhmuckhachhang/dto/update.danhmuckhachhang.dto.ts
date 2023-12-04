import { IsOptional, IsString } from "class-validator"

export class UpdateDanhMucKhachHangDTO {
    @IsString()
    @IsOptional()
    cTenKhachHang?: string

    @IsString()
    @IsOptional()
    cMaSoThue?: string

    @IsString()
    @IsOptional()
    cDiaChi?: string

    @IsString()
    @IsOptional()
    cTinhThanhPho?: string

    @IsString()
    @IsOptional()
    cDienThoai?: string

    @IsString()
    @IsOptional()
    cFax?: string
}