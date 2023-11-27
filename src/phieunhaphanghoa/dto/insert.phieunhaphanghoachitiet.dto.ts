import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertPhieuNhapHangHoaChiTietDTO {
    @IsString()
    @IsNotEmpty()
    cMaHang: string

    @IsString()
    @IsOptional()
    cDonViTinh?: string

    @IsFloat()
    @IsNotEmpty()
    nSoLuong: number

    @IsFloat()
    @IsNotEmpty()
    nDonGia: number

    @IsFloat()
    @IsNotEmpty()
    nThanhTien: number
}