import { Controller, Get } from '@nestjs/common';
import { DanhmuchanghoaService } from './danhmuchanghoa.service';
@Controller('danhmuchanghoa')
export class DanhmuchanghoaController {
    constructor(private danhmuchanghoaService: DanhmuchanghoaService){}
    @Get()
    getAll(){
        return this.danhmuchanghoaService.getAll()
    }
    // @Get(':')
}
