/*
  Warnings:

  - The `genre` column on the `Movies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `price` on the `Movies` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `balance` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "genre",
ADD COLUMN     "genre" TEXT[],
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "balance" SET DATA TYPE INTEGER;
