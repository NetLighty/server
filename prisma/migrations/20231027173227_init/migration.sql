/*
  Warnings:

  - Changed the type of `data` on the `Chat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "data",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;
