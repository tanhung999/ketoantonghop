import { IsDate, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdateTaiKhoanCongNoKhachHangDTO {
    @IsString()
    @IsOptional()
    cTaiKhoan?: string

    @IsString()
    @IsOptional()
    cMaKhachHang?: string

    @IsFloat()
    @IsOptional()
    nSoDuNoDau?: number

    @IsFloat()
    @IsOptional()
    nSoDuCoDau?: number

    @IsDate()
    @IsOptional()
    dNgaySoDu?: Date
}