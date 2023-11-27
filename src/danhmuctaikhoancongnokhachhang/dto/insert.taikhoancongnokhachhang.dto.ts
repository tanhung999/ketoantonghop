import { IsDate, IsNotEmpty, IsString } from "class-validator"
import { IsFloat } from "../../chungtughiso/dto/decorator.dto"

export class InsertTaiKhoanCongNoKhachHangDTO {
    @IsString()
    @IsNotEmpty()
    cTaiKhoan: string

    @IsString()
    @IsNotEmpty()
    cMaKhachHang: string

    @IsFloat()
    @IsNotEmpty()
    nSoDuNoDau: number

    @IsFloat()
    @IsNotEmpty()
    nSoDuCoDau: number

    @IsDate()
    @IsNotEmpty()
    dNgaySoDu: Date


}