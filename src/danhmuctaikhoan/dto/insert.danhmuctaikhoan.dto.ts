import { Optional } from "@nestjs/common"
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator"
import { IsFloat } from "src/chungtughiso/dto/decorator.dto"

export class InsertDanhMucTaiKhoanDTO {
    @IsString()
    @IsNotEmpty()
    cTaiKhoan:string

    @IsString()
    @IsNotEmpty()
    cTenTaiKhoan:string

    @IsFloat()
    @Optional()
    nSoDuNoDau?:number

    @IsFloat()
    @Optional()
    nSoDuCoDau?:number

    @IsBoolean()
    @IsNotEmpty()
    bCoDinhKhoan:boolean

    @IsString()
    @IsNotEmpty()
    cCap: string

    @IsDate()
    @IsNotEmpty()
    dNgaySoDu:Date
}