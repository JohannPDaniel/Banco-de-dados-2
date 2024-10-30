-- CreateEnum
CREATE TYPE "TypeGun" AS ENUM ('firearm', 'bladed_weapon', 'improvised_weapons', 'undefined');

-- CreateEnum
CREATE TYPE "TypeCaliber" AS ENUM ('Ponto_22', 'Ponto_38', 'Nove_milimetros', 'undefined');

-- CreateEnum
CREATE TYPE "TypeState" AS ENUM ('in_possession', 'confiscated');

-- CreateTable
CREATE TABLE "guns" (
    "id" UUID NOT NULL,
    "serial_number" CHAR(12) NOT NULL,
    "registration_code" CHAR(12) NOT NULL,
    "type" "TypeGun" NOT NULL DEFAULT 'undefined',
    "caliber" "TypeCaliber" DEFAULT 'undefined',
    "state" "TypeState" NOT NULL DEFAULT 'in_possession',
    "crimes_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guns_serial_number_key" ON "guns"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "guns_registration_code_key" ON "guns"("registration_code");

-- AddForeignKey
ALTER TABLE "guns" ADD CONSTRAINT "guns_crimes_id_fkey" FOREIGN KEY ("crimes_id") REFERENCES "crimes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
