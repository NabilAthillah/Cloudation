-- CreateTable
CREATE TABLE "SuperAdministratorWebsite" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "SuperAdministratorWebsite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "namaDepan" TEXT NOT NULL,
    "namaBelakang" TEXT NOT NULL,
    "noHp" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "alamat" TEXT,
    "kodePos" TEXT,
    "fotoKTP" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetodePembayaran" (
    "id" SERIAL NOT NULL,
    "metode" TEXT NOT NULL,
    "nomor" TEXT NOT NULL,
    "atasNama" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MetodePembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "jenisBarang" TEXT,
    "deskripsi" TEXT NOT NULL,
    "hargaProduk" DOUBLE PRECISION NOT NULL,
    "ongkosKirim" DOUBLE PRECISION NOT NULL,
    "biayaAdmin" DOUBLE PRECISION NOT NULL,
    "totalHarga" DOUBLE PRECISION NOT NULL,
    "nomorResi" TEXT,
    "Link" TEXT NOT NULL,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "buyerId" TEXT,
    "sellerId" TEXT,
    "buktiPembayaranId" INTEGER,
    "buktiPengirimanId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdministratorWebsite_name_key" ON "SuperAdministratorWebsite"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdministratorWebsite_email_key" ON "SuperAdministratorWebsite"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_noHp_key" ON "User"("noHp");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_Link_key" ON "Transaction"("Link");

-- CreateIndex
CREATE UNIQUE INDEX "Image_publicId_key" ON "Image"("publicId");

-- AddForeignKey
ALTER TABLE "MetodePembayaran" ADD CONSTRAINT "MetodePembayaran_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRequest" ADD CONSTRAINT "VerificationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_buktiPembayaranId_fkey" FOREIGN KEY ("buktiPembayaranId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_buktiPengirimanId_fkey" FOREIGN KEY ("buktiPengirimanId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
