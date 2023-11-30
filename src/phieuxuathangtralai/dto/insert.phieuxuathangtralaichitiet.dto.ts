import { IsNotEmpty, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertPhieuXuatHangTraLaiChiTietDTO {
    @IsString()
    @IsNotEmpty()
    cMaHang: string

    @IsString()
    @IsNotEmpty()
    cDonViTinh: string

    @IsFloat()
    @IsNotEmpty()
    nSoLuong: number

    @IsFloat()
    @IsNotEmpty()
    nDonGiaVon: number

    @IsFloat()
    @IsNotEmpty()
    nThanhTienGiaVon: number

    @IsFloat()
    @IsNotEmpty()
    nDonGiaMua: number

    @IsFloat()
    @IsNotEmpty()
    nThanhTienGiaMua: number

    @IsString()
    @IsNotEmpty()
    cMaChungTuNhap: string
}