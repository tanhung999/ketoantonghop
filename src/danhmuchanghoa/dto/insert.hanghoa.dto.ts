import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { IsFloat } from "../../chungtughiso/dto/decorator.dto";

export class InsertHangHoaDTO {
    @IsString()
    @IsNotEmpty()
    cMaHang: string

    @IsString()
    @IsNotEmpty()
    cTenHang :string 

    @IsString()
    @IsNotEmpty()
    cNhomHang: string

    @IsString()
    @IsNotEmpty()
    cDonViTinh : string

    @IsFloat()
    @IsNotEmpty()
    nSoLuongTonDau: number

    @IsFloat()
    @IsNotEmpty()
    nThanhTienTonDau: number

    @IsDate()
    @IsNotEmpty()
    dNgayTonDau: Date
}