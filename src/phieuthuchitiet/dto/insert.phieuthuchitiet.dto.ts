import { IsNotEmpty, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertPhieuThuChiTietDTO {
    @IsString()
    @IsNotEmpty()
    cDienGiaiChiTiet: string

    @IsFloat()
    @IsNotEmpty()
    nSoTien: number

    @IsString()
    @IsNotEmpty()
    cTaiKhoanNo: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanCo: string
}