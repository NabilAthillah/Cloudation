/*
  Warnings:

  - You are about to drop the column `buktiPembayaranId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `buktiPengirimanId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_buktiPembayaranId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_buktiPengirimanId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "buktiPembayaranId",
DROP COLUMN "buktiPengirimanId",
ADD COLUMN     "buktiPembayaran" TEXT,
ADD COLUMN     "buktiPengiriman" TEXT;

-- DropTable
DROP TABLE "Image";
