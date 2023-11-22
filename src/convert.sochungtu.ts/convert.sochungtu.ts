export function convertSoChungTu (sochungtuBe:string){
    const sochungtuAf = sochungtuBe.replace('-', '/');
    return sochungtuAf
}
export function convertMaChungTu(machungtu: string){
    const machungtuAfFirst = machungtu.replaceAll('-','/')
    const subMaChungTuFirst = machungtuAfFirst.substring(0,9)

    return (subMaChungTuFirst+'-'+machungtuAfFirst.substring(10)).replace('/','-')
}