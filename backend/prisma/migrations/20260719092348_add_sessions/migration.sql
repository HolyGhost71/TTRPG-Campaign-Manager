-- AlterEnum
ALTER TYPE "EntityType" ADD VALUE 'SESSION';

-- CreateTable
CREATE TABLE "SessionDetails" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "date" TEXT,

    CONSTRAINT "SessionDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SessionDetails_entityId_key" ON "SessionDetails"("entityId");

-- AddForeignKey
ALTER TABLE "SessionDetails" ADD CONSTRAINT "SessionDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
