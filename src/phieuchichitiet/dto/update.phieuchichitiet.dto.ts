import { IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuChiChiTietDTO {
    @IsString()
    @IsOptional()
    cDienGiaiChiTiet: string

    @IsFloat()
    @IsOptional()
    nSoTien: number
    
    @IsString()
    @IsOptional()
    cTaiKhoanNo: string

    @IsOptional()
    @IsString()
    cTaiKhoanCo: string
}