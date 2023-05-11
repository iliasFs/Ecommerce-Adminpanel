/*
  Warnings:

  - Made the column `featured` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `newArrivals` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "featured" SET NOT NULL,
ALTER COLUMN "newArrivals" SET NOT NULL;
