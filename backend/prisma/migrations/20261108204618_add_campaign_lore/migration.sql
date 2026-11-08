-- CreateEnum
CREATE TYPE "LoreBlockType" AS ENUM ('TEXT', 'IMAGE');

-- CreateTable
CREATE TABLE "LoreSection" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "title" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoreSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoreBlock" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "type" "LoreBlockType" NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoreBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoreSection" ADD CONSTRAINT "LoreSection_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoreSection" ADD CONSTRAINT "LoreSection_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "LoreSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoreBlock" ADD CONSTRAINT "LoreBlock_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "LoreSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
