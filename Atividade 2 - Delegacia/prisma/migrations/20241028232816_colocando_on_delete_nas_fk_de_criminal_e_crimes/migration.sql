-- DropForeignKey
ALTER TABLE "crimes" DROP CONSTRAINT "crimes_criminal_id_fkey";

-- DropForeignKey
ALTER TABLE "guns" DROP CONSTRAINT "guns_crimes_id_fkey";

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_criminal_id_fkey" FOREIGN KEY ("criminal_id") REFERENCES "criminals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guns" ADD CONSTRAINT "guns_crimes_id_fkey" FOREIGN KEY ("crimes_id") REFERENCES "crimes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
