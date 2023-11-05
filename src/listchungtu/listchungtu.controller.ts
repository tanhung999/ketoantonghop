import { Controller, ForbiddenException, Get } from '@nestjs/common';
import { ListchungtuService } from './listchungtu.service';


@Controller('listchungtu')
export class ListchungtuController {
    constructor (private listChungTuService: ListchungtuService){}

    @Get()
    getAll(){
        return this.listChungTuService.getChungTu()
    }
    
}
