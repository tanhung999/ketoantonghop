import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsFloat } from "src/chungtughiso/dto/decorator.dto";

export class InsertChungTuNganHangChiTietDTO {
    @IsString()
    @IsNotEmpty()
    cDienGiaiChiTiet : string

    @IsNumber()
    @IsNotEmpty()
    nMaSo: number

    @IsFloat()
    @IsNotEmpty()
    nSoTien : number

    @IsString()
    @IsNotEmpty()
    cTaiKhoanNo: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanCo: string
    
}