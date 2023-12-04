import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InsertDanhMucKhachHangDTO {
    @IsString()
    @IsNotEmpty()
    cMaKhachHang: string

    @IsString()
    @IsNotEmpty()
    cTenKhachHang: string

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