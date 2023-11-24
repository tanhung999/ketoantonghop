import {  IsDate, IsNotEmpty, IsOptional, IsString,} from "class-validator";
import { IsFloat } from "./decorator.dto";

export class InsertChungTuGhiSoDTO {
    @IsString()
    @IsNotEmpty()
    cMaChungTu: string

    @IsString()
    @IsNotEmpty()
    cLoaiChungTu: string

    @IsString()
    @IsNotEmpty()
    cSoChungTu: string

    @IsDate()
    @IsNotEmpty()
    dNgayChungTu: Date

    @IsString()
    @IsOptional()
    cHoTen?: string

    @IsString()
    @IsOptional()
    cMaKhachHangNo?: string

    @IsString()
    @IsOptional()
    cTenKhacHangNo?: string

    @IsString()
    @IsOptional()
    cMaSoThueNo?: string

    @IsString()
    @IsOptional()
    cMaKhacHangCo?: string

    @IsString()
    @IsOptional()
    cTenKhachHangCo?: string
    
    @IsString()
    @IsOptional()
    cMaSoThueCo?: string

    @IsString()
    @IsOptional()
    cDienGiai?: string

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
