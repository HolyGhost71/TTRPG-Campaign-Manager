/*
  Warnings:

  - You are about to drop the `SessionDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SessionDetails" DROP CONSTRAINT "SessionDetails_entityId_fkey";

-- DropTable
DROP TABLE "SessionDetails";

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "sessionNumber" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "date" TIMESTAMP(3),
    "recap" TEXT,
    "playerNotes" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_campaignId_idx" ON "Session"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_campaignId_sessionNumber_key" ON "Session"("campaignId", "sessionNumber");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
