import { IsOptional, IsString } from "class-validator"
import { IsFloat } from "./decorator.dto"

export class UpdateChungTuGhiSoChiTietDTO{
    
    @IsString()
    @IsOptional()
    cDienGiaiChiTiet?: string

    @IsFloat()
    @IsOptional()
    nSoTien?: number

    @IsString()
    @IsOptional()
    cTaiKhoanNo?: string

    @IsString()
    @IsOptional()
    cTaiKhoanCo?: string
}