import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InsertChungTuKetChuyenDTO{
    @IsString()
    @IsNotEmpty()
    cMaChungTu: string

    @IsString()
    @IsNotEmpty()
    cLoaiChungTu? : string

    @IsString()
    @IsOptional()
    cSoChungTu? : string

    @IsDate()
    @IsNotEmpty()
    dNgayChungTu: Date

    @IsString()
    @IsOptional()
    cDienGiai? : string
}