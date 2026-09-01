/*
  Warnings:

  - You are about to drop the column `sessionNumber` on the `Session` table. All the data in the column will be lost.
  - Made the column `date` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Session_campaignId_sessionNumber_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "sessionNumber",
ALTER COLUMN "date" SET NOT NULL;
