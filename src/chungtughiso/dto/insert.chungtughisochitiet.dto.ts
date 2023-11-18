import { IsDate, IsEmpty, IsNotEmpty, IsString } from "class-validator";
export class InsertChungTuGhiSoChiTiet {
    @IsString()
    @IsNotEmpty()
    MaChungTu: string

    @IsString()
    @IsNotEmpty()
    DienGiaiChiTiet: string

    @IsString()
    @IsNotEmpty()
    SoTien: string

    @IsString()
    @IsNotEmpty()
    TaiKhoanNo: string

    @IsString()
    @IsNotEmpty()
    TaiKhoanCo: string
}