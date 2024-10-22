/*
  Warnings:

  - You are about to drop the column `value` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `opening_date_time` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `quantity_of_branches` on the `stores` table. All the data in the column will be lost.
  - You are about to alter the column `segment` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `rate` on the `suppliers` table. All the data in the column will be lost.
  - Added the required column `available` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `date_Hour_Open` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity_branches` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Available" AS ENUM ('Yes', 'no');

-- AlterTable
ALTER TABLE "products" DROP COLUMN "value",
ADD COLUMN     "available" "Available" NOT NULL,
ADD COLUMN     "price" MONEY NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "opening_date_time",
DROP COLUMN "quantity_of_branches",
ADD COLUMN     "date_Hour_Open" TIMESTAMP NOT NULL,
ADD COLUMN     "quantity_branches" INTEGER NOT NULL,
ALTER COLUMN "segment" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "address" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "suppliers" DROP COLUMN "rate",
ADD COLUMN     "rating" DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "link_github" DROP NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE DATE,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "updated_at" SET DATA TYPE DATE;

-- DropEnum
DROP TYPE "Rate";
