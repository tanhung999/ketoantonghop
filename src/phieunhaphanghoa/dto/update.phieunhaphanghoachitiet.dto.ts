import { IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class UpdatePhieuNhapHangHoaChiTietDTO {
    @IsString()
    @IsOptional()
    cMaHang: string

    @IsString()
    @IsOptional()
    cDonViTinh?: string

    @IsFloat()
    @IsOptional()
    nSoLuong: number

    @IsFloat()
    @IsOptional()
    nDonGia: number

    @IsFloat()
    @IsOptional()
    nThanhTien: number
}