-- CreateEnum
CREATE TYPE "PowerValue" AS ENUM ('UL', 'L', 'ML', 'M', 'MH', 'H', 'XH');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('ExtraFast', 'Fast', 'MediumFast', 'Medium', 'MediumSlow', 'Slow');

-- CreateEnum
CREATE TYPE "Braking" AS ENUM ('SpoolTension', 'Centrifugal', 'Magnetic', 'electronic');

-- CreateEnum
CREATE TYPE "ReelType" AS ENUM ('Spinning', 'Casting', 'conventional');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Backpack" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Backpack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Combo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
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
    "powerValue" "PowerValue" NOT NULL DEFAULT 'M',
    "action" "Action" NOT NULL DEFAULT 'Medium',
    "backpackId" INTEGER,

    CONSTRAINT "FishingRod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishingReel" (
    "id" SERIAL NOT NULL,
    "type" "ReelType" NOT NULL DEFAULT 'Spinning',
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "gearRatio" DOUBLE PRECISION NOT NULL,
    "braking" "Braking" NOT NULL DEFAULT 'SpoolTension',
    "backpackId" INTEGER,

    CONSTRAINT "FishingReel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "comboId" INTEGER,
    "rain" TEXT NOT NULL,
    "pressure" DOUBLE PRECISION NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "windDirection" TEXT NOT NULL,
    "fishingSpotId" INTEGER NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

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
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "Combo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_fishingSpotId_fkey" FOREIGN KEY ("fishingSpotId") REFERENCES "FishingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishRecord" ADD CONSTRAINT "FishRecord_id_fkey" FOREIGN KEY ("id") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
