BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tChungTuGhiSoChiTiet] (
    [cMaChungTu] NVARCHAR(20) NOT NULL,
    [nMaSo] INT NOT NULL IDENTITY(1,1),
    [cDienGiaiChiTiet] NVARCHAR(50),
    [nSoTien] FLOAT(53),
    [cTaiKhoanNo] NVARCHAR(10),
    [cTaiKhoanCo] NVARCHAR(10),
    CONSTRAINT [PK_tChungTuGhiSoChiTiet] PRIMARY KEY CLUSTERED ([nMaSo])
);

-- AddForeignKey
ALTER TABLE [dbo].[tChungTuGhiSoChiTiet] ADD CONSTRAINT [FK_tChungTuGhiSoChiTiet_tChungTuGhiSo] FOREIGN KEY ([cMaChungTu]) REFERENCES [dbo].[tChungTuGhiSo]([cMaChungTu]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
