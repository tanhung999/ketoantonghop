export function formatMaChungTu (maChungTu: string){
    const maChungTuLastCut=maChungTu.substring(0,9)
      const maChungTuFirstCut = maChungTu.substring(10)
      const maChungTuConfig = maChungTuLastCut+'/'+maChungTuFirstCut
      return maChungTuConfig
}