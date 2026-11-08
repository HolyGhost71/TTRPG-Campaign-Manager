/*
  Warnings:

  - You are about to drop the column `sectionId` on the `LoreBlock` table. All the data in the column will be lost.
  - You are about to drop the `LoreSection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pageId` to the `LoreBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LoreBlock" DROP CONSTRAINT "LoreBlock_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "LoreSection" DROP CONSTRAINT "LoreSection_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "LoreSection" DROP CONSTRAINT "LoreSection_parentId_fkey";

-- AlterTable
ALTER TABLE "LoreBlock" DROP COLUMN "sectionId",
ADD COLUMN     "pageId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "LoreSection";

-- CreateTable
CREATE TABLE "LorePage" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LorePage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LorePage" ADD CONSTRAINT "LorePage_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoreBlock" ADD CONSTRAINT "LoreBlock_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "LorePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
