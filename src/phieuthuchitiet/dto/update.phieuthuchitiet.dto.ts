import { IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuThuChiTietDTO {
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