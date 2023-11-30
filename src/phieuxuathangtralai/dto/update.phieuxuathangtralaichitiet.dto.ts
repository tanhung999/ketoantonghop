import { IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuXuatHangTraLaiChiTietDTO {
    @IsString()
    @IsOptional()
    cMaHang?: string

    @IsString()
    @IsOptional()
    cDonViTinh?: string

    @IsFloat()
    @IsOptional()
    nSoLuong?: number

    @IsFloat()
    @IsOptional()
    nDonGiaVon?: number

    @IsFloat()
    @IsOptional()
    nThanhTienGiaVon?: number

    @IsFloat()
    @IsOptional()
    nDonGiaMua?: number

    @IsFloat()
    @IsOptional()
    nThanhTienGiaMua?: number

    @IsString()
    @IsOptional()
    cMaChungTuNhap?: string
}