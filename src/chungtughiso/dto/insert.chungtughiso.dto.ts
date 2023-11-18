import { IsDate, IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { IsFloat } from "./decorator.dto";

export class InsertChungTuGhiSo {
    @IsString()
    @IsNotEmpty()
    MaChungTu: string

    @IsString()
    @IsNotEmpty()
    LoaiChungTu: string

    @IsString()
    @IsNotEmpty()
    SoChungTu: string

    @IsDate()
    @IsNotEmpty()
    NgayChungTu: Date

    @IsString()
    @IsEmpty()
    HoTen: string

    @IsString()
    @IsEmpty()
    MaKhachHangNo?: string

    @IsString()
    @IsEmpty()
    TenKhacHangNo?: string

    @IsString()
    @IsEmpty()
    MaSoThueNo?: string

    @IsString()
    @IsEmpty()
    MaKhacHangCo?: string

    @IsString()
    @IsEmpty()
    TenKhachHangCo?: string
    
    @IsString()
    @IsEmpty()
    MaSoThueCo?: string

    @IsString()
    @IsEmpty()
    DienGiai?: string

    @IsString()
    @IsEmpty()
    BieuThue?: string

    @IsString()
    @IsEmpty()
    SoSeri?: string

    @IsString()
    @IsEmpty()
    SoHoaDon?: string

    @IsDate()
    @IsEmpty()
    NgayHoaDon?: Date

    @IsFloat()
    @IsEmpty()
    ThueSuat?: number

    @IsFloat()
    @IsEmpty()
    ThueGTGT?: number

    @IsString()
    @IsEmpty()
    MatHang?: string

}
