/*
  Warnings:

  - You are about to drop the column `cover_image_url` on the `Movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "cover_image_url",
ADD COLUMN     "cover_image_url_url" TEXT;
