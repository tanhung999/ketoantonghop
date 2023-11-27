import { Optional } from "@nestjs/common";
import { IsBoolean, IsDate, IsString } from "class-validator";
import { IsFloat } from "src/chungtughiso/dto/decorator.dto";

export class UpdateDanhMucTaiKhoanDTO {

    @IsString()
    @Optional()
    cTenTaiKhoan?:string

    @IsFloat()
    @Optional()
    nSoDuNoDau?:number

    @IsFloat()
    @Optional()
    nSoDuCoDau?:number

    @IsBoolean()
    @Optional()
    bCoDinhKhoan?:boolean

    @IsString()
    @Optional()
    cCap?: string

    @IsDate()
    @Optional()
    dNgaySoDu?:Date
}