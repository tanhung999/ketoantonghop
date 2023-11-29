import { IsNotEmpty, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertPhieuXuatChiTietDTO {
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
    nDonGiaBan: number

    @IsFloat()
    @IsNotEmpty()
    nThanhTienGiaBan: number

    @IsString()
    @IsNotEmpty()
    cMaChungTuNhap: string
}