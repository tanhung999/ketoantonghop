import { format } from 'date-fns';
import { ForbiddenException } from '@nestjs/common';

export  function soChungTuNext(getDanhMucChungTuLast){
    const soChungTu =  getDanhMucChungTuLast.cSoChungTu
    const ngayChungTu = getDanhMucChungTuLast.dNgayChungTu
    const dateNow = new Date()
    const formattedDate = format(dateNow, 'yyyy-MM-dd');
    const formattedDateNgayChungTu = format(ngayChungTu, 'yyyy-MM-dd');
    if(formattedDate > formattedDateNgayChungTu) {
        const soChungTu = '001/'+(dateNow.getMonth()+1)
        return soChungTu
    } else if(formattedDate < formattedDateNgayChungTu) {
        return new ForbiddenException('Chứng từ của bạn có thể sai định dạng')
    } else {
        const soChungTuNextPrev = Number(soChungTu.cSoChungTu.split("/")[0])+1
        const soChungTuNextLast =soChungTu.cSoChungTu.split("/")[1]
        return '00'+soChungTuNextPrev.toString()+'/'+soChungTuNextLast;
    }
}