/*
  Warnings:

  - You are about to drop the column `subCategoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `stockQuantity` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "subCategoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "size" TEXT NOT NULL,
ALTER COLUMN "stockQuantity" SET NOT NULL,
ALTER COLUMN "featured" DROP NOT NULL,
ALTER COLUMN "newArrivals" DROP NOT NULL;

-- DropTable
DROP TABLE "SubCategory";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
