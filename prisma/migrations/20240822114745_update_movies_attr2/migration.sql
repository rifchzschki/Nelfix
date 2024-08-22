/*
  Warnings:

  - You are about to drop the column `cover_image_url_url` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Movies` table. All the data in the column will be lost.
  - Added the required column `video_url` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "cover_image_url_url",
DROP COLUMN "video",
ADD COLUMN     "cover_image_url" TEXT,
ADD COLUMN     "video_url" TEXT NOT NULL;
