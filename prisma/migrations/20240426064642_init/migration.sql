-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rod" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "sections" INTEGER NOT NULL,
    "hardness" TEXT NOT NULL,
    "tone" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reel" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "lineCapacity" TEXT NOT NULL,
    "gearRatio" DOUBLE PRECISION NOT NULL,
    "brakeType" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Reel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bait" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "detail" TEXT,

    CONSTRAINT "Bait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "fishType" TEXT,
    "baitUsed" TEXT,
    "photoUrl" TEXT,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoInfo" (
    "id" SERIAL NOT NULL,
    "recordId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "obstacles" TEXT,
    "depth" TEXT,
    "waterLayer" TEXT,
    "current" TEXT,

    CONSTRAINT "GeoInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherInfo" (
    "id" SERIAL NOT NULL,
    "recordId" INTEGER NOT NULL,
    "pressure" INTEGER,
    "windDirection" TEXT NOT NULL,
    "windForce" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "isRaining" BOOLEAN NOT NULL,

    CONSTRAINT "WeatherInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Rod_equipmentId_key" ON "Rod"("equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Reel_equipmentId_key" ON "Reel"("equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Bait_equipmentId_key" ON "Bait"("equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "GeoInfo_recordId_key" ON "GeoInfo"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherInfo_recordId_key" ON "WeatherInfo"("recordId");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rod" ADD CONSTRAINT "Rod_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reel" ADD CONSTRAINT "Reel_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bait" ADD CONSTRAINT "Bait_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoInfo" ADD CONSTRAINT "GeoInfo_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherInfo" ADD CONSTRAINT "WeatherInfo_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
