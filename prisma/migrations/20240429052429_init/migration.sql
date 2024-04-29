/*
  Warnings:

  - The values [electronic] on the enum `Braking` will be removed. If these variants are still used in the database, this will fail.
  - The values [conventional] on the enum `ReelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Braking_new" AS ENUM ('SpoolTension', 'Centrifugal', 'Magnetic', 'Electronic');
ALTER TABLE "FishingReel" ALTER COLUMN "braking" DROP DEFAULT;
ALTER TABLE "FishingReel" ALTER COLUMN "braking" TYPE "Braking_new" USING ("braking"::text::"Braking_new");
ALTER TYPE "Braking" RENAME TO "Braking_old";
ALTER TYPE "Braking_new" RENAME TO "Braking";
DROP TYPE "Braking_old";
ALTER TABLE "FishingReel" ALTER COLUMN "braking" SET DEFAULT 'SpoolTension';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ReelType_new" AS ENUM ('Spinning', 'Casting', 'Conventional');
ALTER TABLE "FishingReel" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "FishingReel" ALTER COLUMN "type" TYPE "ReelType_new" USING ("type"::text::"ReelType_new");
ALTER TYPE "ReelType" RENAME TO "ReelType_old";
ALTER TYPE "ReelType_new" RENAME TO "ReelType";
DROP TYPE "ReelType_old";
ALTER TABLE "FishingReel" ALTER COLUMN "type" SET DEFAULT 'Spinning';
COMMIT;
