import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertPhieuNhapHangTraLaiChiTietDTO {
    
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
    nDonGiaVon: number

    @IsFloat()
    @IsNotEmpty()
    nThanhTienGiaVon: number

    @IsFloat()
    @IsNotEmpty()
    nDonGiaBan:number

    @IsFloat()
    @IsNotEmpty()
    nThanhTienGiaBan:number
}