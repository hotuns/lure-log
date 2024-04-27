/*
  Warnings:

  - You are about to drop the column `baitUsed` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `fishType` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `Bait` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Equipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeoInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeatherInfo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fishingSpotId` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pressure` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rain` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weather` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windDirection` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windSpeed` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bait" DROP CONSTRAINT "Bait_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_userId_fkey";

-- DropForeignKey
ALTER TABLE "GeoInfo" DROP CONSTRAINT "GeoInfo_recordId_fkey";

-- DropForeignKey
ALTER TABLE "Reel" DROP CONSTRAINT "Reel_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "Rod" DROP CONSTRAINT "Rod_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "WeatherInfo" DROP CONSTRAINT "WeatherInfo_recordId_fkey";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "baitUsed",
DROP COLUMN "dateTime",
DROP COLUMN "fishType",
DROP COLUMN "photoUrl",
ADD COLUMN     "comboId" INTEGER,
ADD COLUMN     "fishingSpotId" INTEGER NOT NULL,
ADD COLUMN     "pressure" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rain" BOOLEAN NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weather" TEXT NOT NULL,
ADD COLUMN     "windDirection" TEXT NOT NULL,
ADD COLUMN     "windSpeed" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Bait";

-- DropTable
DROP TABLE "Equipment";

-- DropTable
DROP TABLE "GeoInfo";

-- DropTable
DROP TABLE "Reel";

-- DropTable
DROP TABLE "Rod";

-- DropTable
DROP TABLE "WeatherInfo";

-- CreateTable
CREATE TABLE "Backpack" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Backpack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Combo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fishingRodId" INTEGER NOT NULL,
    "fishingReelId" INTEGER NOT NULL,

    CONSTRAINT "Combo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishingRod" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "sections" INTEGER NOT NULL,
    "powerValue" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "backpackId" INTEGER,

    CONSTRAINT "FishingRod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishingReel" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "gearRatio" DOUBLE PRECISION NOT NULL,
    "braking" TEXT NOT NULL,
    "backpackId" INTEGER,

    CONSTRAINT "FishingReel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishingSpot" (
    "id" SERIAL NOT NULL,
    "coordinates" TEXT NOT NULL,
    "locationTag" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "FishingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishRecord" (
    "id" INTEGER NOT NULL,
    "species" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FishRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishSpecies" (
    "id" SERIAL NOT NULL,
    "speciesName" TEXT NOT NULL,
    "description" TEXT,
    "imageURL" TEXT,

    CONSTRAINT "FishSpecies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Backpack_userId_key" ON "Backpack"("userId");

-- AddForeignKey
ALTER TABLE "Backpack" ADD CONSTRAINT "Backpack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Combo" ADD CONSTRAINT "Combo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Combo" ADD CONSTRAINT "Combo_fishingRodId_fkey" FOREIGN KEY ("fishingRodId") REFERENCES "FishingRod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Combo" ADD CONSTRAINT "Combo_fishingReelId_fkey" FOREIGN KEY ("fishingReelId") REFERENCES "FishingReel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishingRod" ADD CONSTRAINT "FishingRod_backpackId_fkey" FOREIGN KEY ("backpackId") REFERENCES "Backpack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishingReel" ADD CONSTRAINT "FishingReel_backpackId_fkey" FOREIGN KEY ("backpackId") REFERENCES "Backpack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "Combo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_fishingSpotId_fkey" FOREIGN KEY ("fishingSpotId") REFERENCES "FishingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishRecord" ADD CONSTRAINT "FishRecord_id_fkey" FOREIGN KEY ("id") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
