/*
  Warnings:

  - You are about to drop the `LoreBlock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LoreBlock" DROP CONSTRAINT "LoreBlock_pageId_fkey";

-- AlterTable
ALTER TABLE "LorePage" ADD COLUMN     "content" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "LoreBlock";

-- DropEnum
DROP TYPE "LoreBlockType";
