/*
  Warnings:

  - The `rate` column on the `suppliers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Rate" AS ENUM ('One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten');

-- AlterTable
ALTER TABLE "suppliers" DROP COLUMN "rate",
ADD COLUMN     "rate" "Rate" NOT NULL DEFAULT 'Ten';
