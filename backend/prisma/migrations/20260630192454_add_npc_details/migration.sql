/*
  Warnings:

  - Changed the type of `type` on the `Entity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('NPC', 'LOCATION', 'ITEM', 'QUEST', 'PLAYER');

-- AlterTable
ALTER TABLE "Entity" ADD COLUMN     "dmNotes" TEXT,
ADD COLUMN     "playerNotes" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "EntityType" NOT NULL;

-- CreateTable
CREATE TABLE "NPCDetails" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "species" TEXT,
    "location" TEXT,
    "age" TEXT,
    "status" TEXT,

    CONSTRAINT "NPCDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NPCDetails_entityId_key" ON "NPCDetails"("entityId");

-- AddForeignKey
ALTER TABLE "NPCDetails" ADD CONSTRAINT "NPCDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
