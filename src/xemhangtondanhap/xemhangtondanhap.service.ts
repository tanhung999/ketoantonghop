import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { XemhangdaxuatService } from '../xemhangdaxuat/xemhangdaxuat.service';

@Injectable()
export class XemhangtondanhapService {
    constructor(private prismaService: PrismaService,
                private xemHangDaXuatService: XemhangdaxuatService) {}

    async getHangHoaDaNhap(){
        const getHangHoaDaNhap = await this.prismaService.$queryRaw`SELECT tPhieuNhapHangHoa.cMaChungTu,tPhieuNhapHangHoaChiTiet.cMaHang,CONVERT(date,tPhieuNhapHangHoa.dNgayChungTu) AS 'NgayChungTu',SUM(tPhieuNhapHangHoaChiTiet.nSoLuong) AS 'SoLuongNhap',SUM(tPhieuNhapHangHoaChiTiet.nThanhTien) AS 'ThanhTienNhap', AVG(tPhieuNhapHangHoaChiTiet.nDonGia) AS 'DonGiaNhap' 
        FROM tPhieuNhapHangHoa JOIN tPhieuNhapHangHoaChiTiet ON tPhieuNhapHangHoa.cMaChungTu = tPhieuNhapHangHoaChiTiet.cMaChungTu
        WHERE CONVERT(date,tPhieuNhapHangHoa.dNgayChungTu) < GETDATE()
        GROUP BY tPhieuNhapHangHoa.cMaChungTu,tPhieuNhapHangHoaChiTiet.cMaHang,tPhieuNhapHangHoa.dNgayChungTu
        ORDER BY CONVERT(date,tPhieuNhapHangHoa.dNgayChungTu)
        `
        return getHangHoaDaNhap
    }
    async getHangTraLai (){
        const getHangTraLai = await this.prismaService.$queryRaw`SELECT tPhieuNhapHangTraLai.cMaChungTu,tPhieuNhapHangTraLaiChiTiet.cMaHang,CONVERT(date,tPhieuNhapHangTraLai.dNgayChungTu) AS 'NgayChungTu',SUM(tPhieuNhapHangTraLaiChiTiet.nSoLuong) AS 'SoLuongNhap',SUM(tPhieuNhapHangTraLaiChiTiet.nThanhTienGiaVon) AS 'ThanhTienNhap', AVG(tPhieuNhapHangTraLaiChiTiet.nDonGiaVon) AS 'DonGiaNhap' 
        FROM tPhieuNhapHangTraLai JOIN tPhieuNhapHangTraLaiChiTiet ON tPhieuNhapHangTraLai.cMaChungTu = tPhieuNhapHangTraLaiChiTiet.cMaChungTu
        WHERE CONVERT(date,tPhieuNhapHangTraLai.dNgayChungTu) < GETDATE()
        GROUP BY tPhieuNhapHangTraLai.cMaChungTu,tPhieuNhapHangTraLaiChiTiet.cMaHang,tPhieuNhapHangTraLai.dNgayChungTu
        ORDER BY CONVERT(date,tPhieuNhapHangTraLai.dNgayChungTu)`
        return getHangTraLai
    }
    async getHangTonDau (){
        const getHangTonDau = await this.prismaService.$queryRaw`SELECT MaChungTuNhap = 'TonDau', cMaHang, dNgayTonDau AS 'NgayNhap', nSoLuongTonDau AS 'SoLuongNhap', nThanhTienTonDau AS 'ThanhTienNhap',
        DonGia = nThanhTienTonDau/nSoLuongTonDau 
        FROM  tDanhMucHangHoa 
        WHERE nSoLuongTonDau > 0`
        return getHangTonDau
    }
    async allHangTon () {
        const hangTonDaNhap =  await this.getHangHoaDaNhap()
        const hangTonTraLai = await this.getHangTraLai()
        const hangTonDau = await this.getHangTonDau()
        const tatCaHangTon =[].concat(hangTonDaNhap,hangTonTraLai,hangTonDau)
        
        return tatCaHangTon
    }
    async hangTonTheoLo(){
        const hangTonSauXuat = await this.prismaService.$queryRaw`SELECT HangTon.cMaHang,CONVERT(date,HangTon.NgayChungTu) AS NgayNhap ,SoLuongTon = HangTon.SoLuongNhap - XuatHang.SoLuongXuat ,
                    ThanhTienTon = HangTon.ThanhTienNhap - XuatHang.ThanhTien, DonGia = (HangTon.ThanhTienNhap - XuatHang.ThanhTien) /(HangTon.SoLuongNhap - XuatHang.SoLuongXuat),
                    HangTon.cMaChungTu
            FROM ((SELECT tPhieuNhapHangHoa.cMaChungTu,tPhieuNhapHangHoaChiTiet.cMaHang,CONVERT(date,tPhieuNhapHangHoa.dNgayChungTu) AS NgayChungTu, SUM(tPhieuNhapHangHoaChiTiet.nSoLuong) AS SoLuongNhap,SUM(tPhieuNhapHangHoaChiTiet.nThanhTien) AS ThanhTienNhap, AVG(tPhieuNhapHangHoaChiTiet.nDonGia) AS DonGiaNhap
                    FROM tPhieuNhapHangHoa JOIN tPhieuNhapHangHoaChiTiet ON tPhieuNhapHangHoa.cMaChungTu = tPhieuNhapHangHoaChiTiet.cMaChungTu
                    WHERE CONVERT(date,tPhieuNhapHangHoa.dNgayChungTu) < GETDATE()
                    GROUP BY tPhieuNhapHangHoa.cMaChungTu,tPhieuNhapHangHoaChiTiet.cMaHang,tPhieuNhapHangHoa.dNgayChungTu    
                )
                UNION ALL
                (SELECT tPhieuNhapHangTraLai.cMaChungTu,tPhieuNhapHangTraLaiChiTiet.cMaHang,CONVERT(date,tPhieuNhapHangTraLai.dNgayChungTu) AS NgayChungTu,SUM(tPhieuNhapHangTraLaiChiTiet.nSoLuong) AS SoLuongNhap,SUM(tPhieuNhapHangTraLaiChiTiet.nThanhTienGiaVon) AS ThanhTienNhap, AVG(tPhieuNhapHangTraLaiChiTiet.nDonGiaVon) AS DonGiaNhap
                    FROM tPhieuNhapHangTraLai JOIN tPhieuNhapHangTraLaiChiTiet ON tPhieuNhapHangTraLai.cMaChungTu = tPhieuNhapHangTraLaiChiTiet.cMaChungTu
                    WHERE CONVERT(date,tPhieuNhapHangTraLai.dNgayChungTu) < GETDATE()
                    GROUP BY tPhieuNhapHangTraLai.cMaChungTu,tPhieuNhapHangTraLaiChiTiet.cMaHang,tPhieuNhapHangTraLai.dNgayChungTu)
                UNION ALL
                (SELECT MaChungTuNhap = 'TonDau', cMaHang, dNgayTonDau AS NgayNhap, nSoLuongTonDau AS SoLuongNhap, nThanhTienTonDau AS ThanhTienNhap,
                    DonGia = nThanhTienTonDau/nSoLuongTonDau 
                    FROM  tDanhMucHangHoa 
                    WHERE nSoLuongTonDau > 0)) AS HangTon
            JOIN (
                (SELECT cMaChungTuNhap, cMaHang, SUM(nSoLuong)AS SoLuongXuat,SUM(nThanhTienGiaVon) AS ThanhTien
                    FROM tPhieuXuatHangHoaChiTiet
                    GROUP BY cMaChungTuNhap, cMaHang)
                UNION ALL 
                (SELECT cMaChungTuNhap,cMaHang, SUM(nSoLuong) AS SoLuong, SUM(nThanhTienGiaVon) AS ThanhTienGiaVon
                FROM tPhieuXuatHangTraLaiChiTiet
                GROUP BY cMaChungTuNhap,cMaHang )
                ) AS XuatHang 
            ON HangTon.cMaChungTu = XuatHang.cMaChungTuNhap AND HangTon.cMaHang = XuatHang.cMaHang
            WHERE HangTon.SoLuongNhap - XuatHang.SoLuongXuat > 0.01`;

        const hangTonTruocXuat = await this.prismaService.$queryRaw`SELECT * FROM ((SELECT tPhieuNhapHangHoa.cMaChungTu,tPhieuNhapHangHoaChiTiet.cMaHang,CONVERT(date,tPhieuNhapHangHoa.dNgayChungTu) AS NgayChungTu, SUM(tPhieuNhapHangHoaChiTiet.nSoLuong) AS SoLuongNhap,SUM(tPhieuNhapHangHoaChiTiet.nThanhTien) AS ThanhTienNhap, AVG(tPhieuNhapHangHoaChiTiet.nDonGia) AS DonGiaNhap
                FROM tPhieuNhapHangHoa JOIN tPhieuNhapHangHoaChiTiet ON tPhieuNhapHangHoa.cMaChungTu = tPhieuNhapHangHoaChiTiet.cMaChungTu
                WHERE CONVERT(date,tPhieuNhapHangHoa.dNgayChungTu) < GETDATE()
                GROUP BY tPhieuNhapHangHoa.cMaChungTu,tPhieuNhapHangHoaChiTiet.cMaHang,tPhieuNhapHangHoa.dNgayChungTu    
                )
                UNION ALL
                (SELECT tPhieuNhapHangTraLai.cMaChungTu,tPhieuNhapHangTraLaiChiTiet.cMaHang,CONVERT(date,tPhieuNhapHangTraLai.dNgayChungTu) AS NgayChungTu,SUM(tPhieuNhapHangTraLaiChiTiet.nSoLuong) AS SoLuongNhap,SUM(tPhieuNhapHangTraLaiChiTiet.nThanhTienGiaVon) AS ThanhTienNhap, AVG(tPhieuNhapHangTraLaiChiTiet.nDonGiaVon) AS DonGiaNhap
                        FROM tPhieuNhapHangTraLai JOIN tPhieuNhapHangTraLaiChiTiet ON tPhieuNhapHangTraLai.cMaChungTu = tPhieuNhapHangTraLaiChiTiet.cMaChungTu
                        WHERE CONVERT(date,tPhieuNhapHangTraLai.dNgayChungTu) < GETDATE()
                        GROUP BY tPhieuNhapHangTraLai.cMaChungTu,tPhieuNhapHangTraLaiChiTiet.cMaHang,tPhieuNhapHangTraLai.dNgayChungTu)
                UNION ALL
                (SELECT MaChungTuNhap = 'TonDau', cMaHang, dNgayTonDau AS NgayNhap, nSoLuongTonDau AS SoLuongNhap, nThanhTienTonDau AS ThanhTienNhap,
                        DonGia = nThanhTienTonDau/nSoLuongTonDau 
                        FROM  tDanhMucHangHoa 
                        WHERE nSoLuongTonDau > 0)) AS HangTon
            WHERE NOT EXISTS (
                SELECT 1
                FROM (SELECT cMaChungTuNhap, cMaHang, SUM(nSoLuong)AS SoLuongXuat,SUM(nThanhTienGiaVon) AS ThanhTien
                    FROM tPhieuXuatHangHoaChiTiet
                    GROUP BY cMaChungTuNhap, cMaHang
                    UNION ALL 
                    (SELECT cMaChungTuNhap,cMaHang, SUM(nSoLuong) AS SoLuong, SUM(nThanhTienGiaVon) AS ThanhTienGiaVon
                    FROM tPhieuXuatHangTraLaiChiTiet
                    GROUP BY cMaChungTuNhap,cMaHang )) AS XuatHang
                WHERE HangTon.cMaChungTu = XuatHang.cMaChungTuNhap AND HangTon.cMaHang = XuatHang.cMaHang 
            ) ORDER BY cMaHang`;
        return [hangTonSauXuat,hangTonTruocXuat]
    }
    async hangTonTheoMa(bymahang){
        let hangTonTheoMa = []
        const tatCaHangTonTheoLo = await this.allHangTon()
        tatCaHangTonTheoLo.map(hangTon => {
            hangTon.cMaHang == bymahang? hangTonTheoMa.push(hangTon):""
        })

        return hangTonTheoMa
        
    }
    
}
