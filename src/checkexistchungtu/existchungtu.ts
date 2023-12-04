export async function checkExistChungTu (cMaChungTu:string,Table:any){
    const existChungTu = await this.prismaService.Table.findUnique({
        where:{cMaChungTu}
    })
    return existChungTu;
}