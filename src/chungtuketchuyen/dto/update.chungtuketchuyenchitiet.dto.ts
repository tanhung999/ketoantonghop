import { IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdateChungTuKetChuyenChiTietDTO {

    @IsString()
    @IsOptional()
    cDienGiaiChiTiet? :string

    @IsString()
    @IsOptional()
    cTaiKhoanNo?: string

    @IsString()
    @IsOptional()
    cTaiKhoanCo?: string

    @IsFloat()
    @IsOptional()
    nSoTien?: number
}