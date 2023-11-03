BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tChungTuGhiSo] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [cSoChungTu] NVARCHAR(6),
    [dNgayChungTu] DATETIME,
    [cHoTen] NVARCHAR(30),
    [cMaKhachHangNo] NVARCHAR(10),
    [cTenKhachHangNo] NVARCHAR(100),
    [cMaSoThueNo] NVARCHAR(20),
    [cMaKhachHangCo] NVARCHAR(10),
    [cTenKhachHangCo] NVARCHAR(100),
    [cMaSoThueCo] NVARCHAR(20),
    [cDienGiai] NVARCHAR(100),
    [cBieuThue] NVARCHAR(2),
    [cSoSeRi] NVARCHAR(10),
    [cSoHoaDon] NVARCHAR(10),
    [dNgayHoaDon] DATETIME,
    [nThueSuat] FLOAT(53),
    [nThueGTGT] FLOAT(53),
    [cMatHang] NVARCHAR(30),
    CONSTRAINT [PK__tChungTu__D44B84A36C905F96] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tChungTuGhiSoChiTiet] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [nMaSo] INT NOT NULL,
    [cDienGiaiChiTiet] NVARCHAR(50),
    [nSoTien] FLOAT(53),
    [cTaiKhoanNo] NVARCHAR(10),
    [cTaiKhoanCo] NVARCHAR(10),
    CONSTRAINT [PK__tChungTu__9B1A8F8B0CFAAE93] PRIMARY KEY CLUSTERED ([nMaSo])
);

-- CreateTable
CREATE TABLE [dbo].[tChungTuKetChuyen] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [cSoChungTu] NVARCHAR(10),
    [dNgayChungTu] DATETIME,
    [cDienGiai] NVARCHAR(50),
    CONSTRAINT [PK__tChungTu__D44B84A326169D2D] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tChungTuKetChuyenChiTiet] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cDienGiaiChiTiet] NVARCHAR(100),
    [cTaiKhoanNo] NVARCHAR(10),
    [cTaiKhoanCo] NVARCHAR(10),
    [nSoTien] FLOAT(53),
    CONSTRAINT [PK__tChungTu__3213E83F0ED5588E] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tChungTuNganHang] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [dNgayChungTu] DATETIME,
    [cSoChungTu] NVARCHAR(6),
    [cHoTen] NVARCHAR(30),
    [cMaKhachHang] NVARCHAR(10),
    [cTenKhachHang] NVARCHAR(100),
    [cMaSoThue] NVARCHAR(20),
    [cDienGiai] NVARCHAR(100),
    [nThu_Chi] TINYINT,
    CONSTRAINT [PK__tChungTu__D44B84A36FB52659] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tChungTuNganHangChiTiet] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [nMaSo] INT NOT NULL,
    [cDienGiaiChiTiet] NVARCHAR(50),
    [nSoTien] FLOAT(53),
    [cTaiKhoanNo] NVARCHAR(10),
    [cTaiKhoanCo] NVARCHAR(10),
    CONSTRAINT [PK__tChungTu__9B1A8F8BDFF43EAC] PRIMARY KEY CLUSTERED ([nMaSo])
);

-- CreateTable
CREATE TABLE [dbo].[tDanhMucChungTu] (
    [cMaLoaiChungTu] NVARCHAR(2) NOT NULL,
    [cTenLoaiChungTu] NVARCHAR(30) NOT NULL,
    [cTenBang] NVARCHAR(30),
    CONSTRAINT [PK_tDanhMucChungTu] PRIMARY KEY CLUSTERED ([cMaLoaiChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tDanhMucHangHoa] (
    [cMaHang] NVARCHAR(8) NOT NULL,
    [cTenHang] NVARCHAR(50),
    [cNhomHang] NVARCHAR(5),
    [cDonViTinh] NVARCHAR(10),
    [nSoLuongTonDau] FLOAT(53),
    [nThanhTienTonDau] FLOAT(53),
    [dNgayTonDau] DATETIME,
    CONSTRAINT [PK_tDanhMucHangHoa] PRIMARY KEY CLUSTERED ([cMaHang])
);

-- CreateTable
CREATE TABLE [dbo].[tDanhMucKhachHang] (
    [cMaKhachHang] NVARCHAR(5) NOT NULL,
    [cTenKhachHang] NVARCHAR(100),
    [cMaSoThue] NVARCHAR(20),
    [cDiaChi] NVARCHAR(50),
    [cTinhThanhPho] NVARCHAR(30),
    [cDienThoai] NVARCHAR(50),
    [cFax] NVARCHAR(50),
    CONSTRAINT [PK_tDanhMucKhachHang] PRIMARY KEY CLUSTERED ([cMaKhachHang])
);

-- CreateTable
CREATE TABLE [dbo].[tDanhMucTaiKhoan] (
    [cTaiKhoan] NVARCHAR(20) NOT NULL,
    [cTenTaiKhoan] NVARCHAR(60),
    [nSoDuNoDau] FLOAT(53),
    [nSoDuCoDau] FLOAT(53),
    [bCoDinhKhoan] BIT NOT NULL,
    [cCap] NVARCHAR(1),
    [dNgaySoDu] DATETIME,
    CONSTRAINT [PK_tDanhMucTaiKhoan] PRIMARY KEY CLUSTERED ([cTaiKhoan])
);

-- CreateTable
CREATE TABLE [dbo].[tDanhMucTaiKhoanCongNoKhachHang] (
    [cTaiKhoan] NVARCHAR(5) NOT NULL,
    [cMaKhachHang] NVARCHAR(5) NOT NULL,
    [nSoDuNoDau] FLOAT(53),
    [nSoDuCoDau] FLOAT(53),
    [dNgaySoDu] DATETIME,
    CONSTRAINT [PK_tDanhMucTaiKhoanCongNoKhachHang] PRIMARY KEY CLUSTERED ([cTaiKhoan],[cMaKhachHang])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuChi] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [cSoChungTu] NVARCHAR(6),
    [dNgayChungTu] DATETIME,
    [cHoTen] NVARCHAR(30),
    [cDiaChi] NVARCHAR(50),
    [cMaKhachHang] NVARCHAR(10),
    [cTenKhachHang] NVARCHAR(100),
    [cMaSoThue] NVARCHAR(20),
    [cDienGiai] NVARCHAR(100),
    [cBieuThue] NVARCHAR(2),
    [cSoSeRi] NVARCHAR(10),
    [cSoHoaDon] NVARCHAR(10),
    [dNgayHoaDon] DATETIME,
    [nThueSuat] FLOAT(53),
    [cMatHang] NVARCHAR(30),
    CONSTRAINT [PK__tPhieuCh__D44B84A35FA2CB0B] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuChiChiTiet] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cDienGiaiChiTiet] NVARCHAR(50),
    [nSoTien] FLOAT(53),
    [cTaiKhoanNo] NVARCHAR(10),
    [cTaiKhoanCo] NVARCHAR(10),
    CONSTRAINT [PK__tPhieuCh__3213E83F29AA18B7] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuNhapHangHoa] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [dNgayChungTu] DATETIME,
    [cSoChungTu] NVARCHAR(6),
    [cMaNguoiBan] NVARCHAR(6),
    [cTenNguoiBan] NVARCHAR(100),
    [cMaSoThueNguoiBan] NVARCHAR(15),
    [cTaiKhoanNo] NVARCHAR(6),
    [cTaiKhoanNoGTGT] NVARCHAR(6),
    [cTaiKhoanCo] NVARCHAR(6),
    [cDienGiai] NVARCHAR(70),
    [cSoSeRi] NVARCHAR(10),
    [cSoHoaDon] NVARCHAR(10),
    [dNgayHoaDon] DATETIME,
    [nThueSuat] FLOAT(53),
    [nThueGTGT] FLOAT(53),
    [cMatHang] NVARCHAR(30),
    CONSTRAINT [PK__tPhieuNh__D44B84A3A201A901] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuNhapHangHoaChiTiet] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [nMaSo] INT NOT NULL,
    [cMaHang] NVARCHAR(10) NOT NULL,
    [cDonViTinh] NVARCHAR(10),
    [nSoLuong] FLOAT(53),
    [nDonGia] FLOAT(53),
    [nThanhTien] FLOAT(53),
    CONSTRAINT [PK__tPhieuNh__9B1A8F8BDE864C56] PRIMARY KEY CLUSTERED ([nMaSo])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuNhapHangTraLai] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [dNgayChungTu] DATETIME,
    [cSoChungTu] NVARCHAR(6) NOT NULL,
    [cDienGiai] NVARCHAR(70),
    [cMaKhachHang] NVARCHAR(10),
    [cTenKhachHang] NVARCHAR(40),
    [cMaSoThue] NVARCHAR(20),
    [cTaiKhoanNoGiaVon] NVARCHAR(6),
    [cTaiKhoanCoGiaVon] NVARCHAR(6),
    [cTaiKhoanNoGiaBan] NVARCHAR(6),
    [cTaiKhoanNoGTGT] NVARCHAR(6),
    [cTaiKhoanCoGiaBan] NVARCHAR(6),
    [cBieuThue] NVARCHAR(2),
    [cSoSeRi] NVARCHAR(10),
    [cSoHoaDon] NVARCHAR(10),
    [dNgayHoaDon] DATETIME,
    [nThueSuat] FLOAT(53),
    [nThueGTGT] FLOAT(53),
    [cMatHang] NVARCHAR(30),
    CONSTRAINT [PK__tPhieuNh__D44B84A30A296FCF] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuNhapHangTraLaiChiTiet] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [nMaSo] INT NOT NULL,
    [cMaHang] NVARCHAR(15) NOT NULL,
    [cDonViTinh] NVARCHAR(10),
    [nSoLuong] FLOAT(53),
    [nDonGiaVon] FLOAT(53),
    [nThanhTienGiaVon] FLOAT(53),
    [nDonGiaBan] FLOAT(53),
    [nThanhTienGiaBan] FLOAT(53),
    CONSTRAINT [PK__tPhieuNh__9B1A8F8B2006A51E] PRIMARY KEY CLUSTERED ([nMaSo])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuThu] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [dNgayChungTu] DATETIME,
    [cSoChungTu] NVARCHAR(6),
    [cHoTen] NVARCHAR(30),
    [cDiaChi] NVARCHAR(50),
    [cSoChungTuGoc] TINYINT,
    [cMaKhachHang] NVARCHAR(10),
    [cTenKhachHang] NVARCHAR(100),
    [cMaSoThue] NVARCHAR(20),
    [cDienGiai] NVARCHAR(100),
    [cBieuThue] NVARCHAR(2),
    [cSoSeRi] NVARCHAR(10),
    [cSoHoaDon] NVARCHAR(10),
    [dNgayHoaDon] DATETIME,
    [nThueSuat] FLOAT(53),
    [cMatHang] NVARCHAR(30),
    CONSTRAINT [PK__tPhieuTh__D44B84A38574BE7E] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuThuChiTiet] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cDienGiaiChiTiet] NVARCHAR(50),
    [nSoTien] FLOAT(53),
    [cTaiKhoanNo] NVARCHAR(10),
    [cTaiKhoanCo] NVARCHAR(10),
    CONSTRAINT [PK__tPhieuTh__3213E83F6B064D0A] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuXuatHangHoa] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [dNgayChungTu] DATETIME,
    [cSoChungTu] NVARCHAR(6),
    [cMaKhachHang] NVARCHAR(6),
    [cTenKhachHang] NVARCHAR(50),
    [cMaSoThue] NVARCHAR(15),
    [cTaiKhoanNoGiaVon] NVARCHAR(6),
    [cTaiKhoanCoGiaVon] NVARCHAR(6),
    [cTaiKhoanNoGiaBan] NVARCHAR(6),
    [cTaiKhoanCoGiaBan] NVARCHAR(6),
    [cTaiKhoanCoGTGT] NVARCHAR(6),
    [cDienGiai] NVARCHAR(70),
    [cMatHang] NVARCHAR(30),
    [nThueSuat] FLOAT(53),
    [nThueGTGT] INT,
    [cSoSeri] NVARCHAR(15),
    [cSoHoaDon] NVARCHAR(7),
    CONSTRAINT [PK__tPhieuXu__D44B84A34541147D] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuXuatHangHoaChiTiet] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cMaHang] NVARCHAR(10) NOT NULL,
    [cDonViTinh] NVARCHAR(10),
    [nSoLuong] FLOAT(53),
    [nDonGiaVon] FLOAT(53),
    [nThanhTienGiaVon] INT,
    [nDonGiaBan] FLOAT(53),
    [nThanhTienGiaBan] INT,
    [cMaChungTuNhap] NVARCHAR(50),
    CONSTRAINT [PK__tPhieuXu__3213E83FCB013B66] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuXuatHangTraLai] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [dNgayChungTu] DATETIME,
    [cSoChungTu] NVARCHAR(6) NOT NULL,
    [cDienGiai] NVARCHAR(70),
    [cMaKhachHang] NVARCHAR(10),
    [cTenKhachHang] NVARCHAR(40),
    [cMaSoThue] NVARCHAR(20),
    [cTaiKhoanNoGiaVon] NVARCHAR(6),
    [cTaiKhoanCoGiaVon] NVARCHAR(6),
    [cTaiKhoanNoGiaMua] NVARCHAR(6),
    [cTaiKhoanCoGTGT] NVARCHAR(6),
    [cTaiKhoanCoGiaMua] NVARCHAR(6),
    [cBieuThue] NVARCHAR(2),
    [cSoSeRi] NVARCHAR(10),
    [cSoHoaDon] NVARCHAR(10),
    [dNgayHoaDon] DATETIME,
    [nThueSuat] FLOAT(53),
    [nThueGTGT] FLOAT(53),
    [cMatHang] NVARCHAR(30),
    CONSTRAINT [PK__tPhieuXu__D44B84A3DF067B8D] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tPhieuXuatHangTraLaiChiTiet] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [nMaSo] INT NOT NULL,
    [cMaHang] NVARCHAR(15) NOT NULL,
    [cDonViTinh] NVARCHAR(10),
    [nSoLuong] FLOAT(53),
    [nDonGiaVon] FLOAT(53),
    [nThanhTienGiaVon] FLOAT(53),
    [nDonGiaMua] FLOAT(53),
    [nThanhTienGiaMua] FLOAT(53),
    [cMaChungTuNhap] NVARCHAR(20),
    CONSTRAINT [PK__tPhieuXu__9B1A8F8BD1077038] PRIMARY KEY CLUSTERED ([nMaSo])
);

-- CreateTable
CREATE TABLE [dbo].[tTempDanhMucKhachHang] (
    [cMaKhachHang] NVARCHAR(5) NOT NULL,
    [cTenKhachHang] NVARCHAR(100),
    [cMaSoThue] NVARCHAR(20),
    [cDiaChi] NVARCHAR(50),
    [cTinhThanhPho] NVARCHAR(30),
    [cDienThoai] NVARCHAR(50),
    [cFax] NVARCHAR(50),
    CONSTRAINT [PK_tTempDanhMucKhachHang] PRIMARY KEY CLUSTERED ([cMaKhachHang])
);

-- CreateTable
CREATE TABLE [dbo].[tTempPhieuNhapHangHoa] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [cLoaiChungTu] NVARCHAR(2),
    [dNgayChungTu] DATETIME,
    [cSoChungTu] NVARCHAR(6),
    [cMaNguoiBan] NVARCHAR(6),
    [cTenNguoiBan] NVARCHAR(100),
    [cMaSoThueNguoiBan] NVARCHAR(15),
    [cTaiKhoanNo] NVARCHAR(6),
    [cTaiKhoanNoGTGT] NVARCHAR(6),
    [cTaiKhoanCo] NVARCHAR(6),
    [cDienGiai] NVARCHAR(70),
    [cSoSeRi] NVARCHAR(10),
    [cSoHoaDon] NVARCHAR(10),
    [dNgayHoaDon] DATETIME,
    [nThueSuat] FLOAT(53),
    [nThueGTGT] FLOAT(53),
    [cMatHang] NVARCHAR(30),
    CONSTRAINT [PK__tTempPhi__D44B84A35E6A6FE7] PRIMARY KEY CLUSTERED ([cMaChungTu])
);

-- CreateTable
CREATE TABLE [dbo].[tTempPhieuNhapHangHoaChiTiet] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [nMaSo] INT NOT NULL,
    [cMaHang] NVARCHAR(10) NOT NULL,
    [cDonViTinh] NVARCHAR(10),
    [nSoLuong] FLOAT(53),
    [nDonGia] FLOAT(53),
    [nThanhTien] FLOAT(53),
    CONSTRAINT [PK__tTempPhi__9B1A8F8BE7CDA8FB] PRIMARY KEY CLUSTERED ([nMaSo])
);

-- AddForeignKey
ALTER TABLE [dbo].[tChungTuGhiSoChiTiet] ADD CONSTRAINT [FK__tChungTuG__cMaCh__6A30C649] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tChungTuGhiSo]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tChungTuKetChuyenChiTiet] ADD CONSTRAINT [FK__tChungTuK__cMaCh__6B24EA82] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tChungTuKetChuyen]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tChungTuNganHangChiTiet] ADD CONSTRAINT [FK__tChungTuN__cMaCh__6C190EBB] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tChungTuNganHang]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tDanhMucTaiKhoanCongNoKhachHang] ADD CONSTRAINT [FK_tDanhMucTaiKhoanCongNoKhachHang_tDanhMucKhachHang] FOREIGN KEY ([cMaKhachHang]) REFERENCES [dbo].[tDanhMucKhachHang]([cMaKhachHang]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tPhieuChiChiTiet] ADD CONSTRAINT [FK__tPhieuChi__cMaCh__6D0D32F4] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tPhieuChi]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tPhieuNhapHangHoaChiTiet] ADD CONSTRAINT [FK__tPhieuNha__cMaCh__6E01572D] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tPhieuNhapHangHoa]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tPhieuNhapHangTraLaiChiTiet] ADD CONSTRAINT [FK__tPhieuNha__cMaCh__71D1E811] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tPhieuNhapHangTraLai]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tPhieuThuChiTiet] ADD CONSTRAINT [FK__tPhieuThu__cMaCh__72C60C4A] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tPhieuThu]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tPhieuXuatHangHoaChiTiet] ADD CONSTRAINT [FK__tPhieuXua__cMaCh__73BA3083] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tPhieuXuatHangHoa]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tPhieuXuatHangTraLaiChiTiet] ADD CONSTRAINT [FK__tPhieuXua__cMaCh__74AE54BC] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tPhieuXuatHangTraLai]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
