import { IsDate, IsOptional, IsString } from "class-validator"

export class UpdateChungTuKetChuyenDTO {

    @IsString()
    @IsOptional()
    cLoaiChungTu? : string

    @IsString()
    @IsOptional()
    cSoChungTu? : string

    @IsDate()
    @IsOptional()
    dNgayChungTu?: Date

    @IsString()
    @IsOptional()
    cDienGiai? : string
}