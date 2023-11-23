import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsFloat } from "../../chungtughiso/dto/decorator.dto";

export class InsertChungTuKetChuyenChiTietDTO {

    @IsString()
    @IsNotEmpty()
    cMaChungTu: string

    @IsString()
    @IsOptional()
    cDienGiaiChiTiet? :string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanNo: string

    @IsString()
    @IsNotEmpty()
    cTaiKhoanCo: string

    @IsFloat()
    @IsNotEmpty()
    nSoTien: number


}