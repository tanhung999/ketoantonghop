import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { IsFloat } from "./decorator.dto"

export class InsertChungTuGhiSoChiTietDTO {
    @IsString()
    @IsNotEmpty()
    cDienGiaiChiTiet: string

    @IsNumber()
    @IsNotEmpty()
    nMaSo: number

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