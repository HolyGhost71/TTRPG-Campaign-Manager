-- CreateTable
CREATE TABLE "LocationDetails" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "population" INTEGER,
    "ruler" TEXT,
    "region" TEXT,

    CONSTRAINT "LocationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemDetails" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "owner" TEXT,
    "rarity" TEXT,

    CONSTRAINT "ItemDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FactionDetails" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "leader" TEXT,

    CONSTRAINT "FactionDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerDetails" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "species" TEXT,
    "location" TEXT,
    "age" TEXT,
    "status" TEXT,
    "appearance" TEXT,
    "player" TEXT,

    CONSTRAINT "PlayerDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestDetails" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "questGiver" TEXT,

    CONSTRAINT "QuestDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocationDetails_entityId_key" ON "LocationDetails"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemDetails_entityId_key" ON "ItemDetails"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "FactionDetails_entityId_key" ON "FactionDetails"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerDetails_entityId_key" ON "PlayerDetails"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestDetails_entityId_key" ON "QuestDetails"("entityId");

-- AddForeignKey
ALTER TABLE "LocationDetails" ADD CONSTRAINT "LocationDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemDetails" ADD CONSTRAINT "ItemDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactionDetails" ADD CONSTRAINT "FactionDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerDetails" ADD CONSTRAINT "PlayerDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestDetails" ADD CONSTRAINT "QuestDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
