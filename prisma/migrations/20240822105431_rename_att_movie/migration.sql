/*
  Warnings:

  - You are about to drop the column `cover_image_url` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `release_year` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Movies` table. All the data in the column will be lost.
  - Added the required column `release_year` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "cover_image_url",
DROP COLUMN "created_at",
DROP COLUMN "release_year",
DROP COLUMN "updated_at",
ADD COLUMN     "cover_image_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "release_year" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
