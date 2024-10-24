-- CreateEnum
CREATE TYPE "TypeGun" AS ENUM ('firearm', 'bladed_weapon', 'improvised_weapons', 'undefined');

-- CreateEnum
CREATE TYPE "TypeCaliber" AS ENUM ('Ponto_22', 'Ponto_38', 'Nove_milimetros', 'undefined');

-- CreateEnum
CREATE TYPE "TypeState" AS ENUM ('in_possession', 'confiscated');

-- CreateEnum
CREATE TYPE "TypePriority" AS ENUM ('baixa', 'media', 'alta');

-- CreateEnum
CREATE TYPE "StatusOffense" AS ENUM ('Aguardando_investigar', 'Em_Andamento', 'Resolvido', 'Arquivado');

-- CreateTable
CREATE TABLE "criminals" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "rg" CHAR(9) NOT NULL,
    "criminal_record" VARCHAR(50) NOT NULL,
    "nationality" VARCHAR(50) NOT NULL,
    "gender" TEXT,
    "address" TEXT,
    "recidivist" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "criminals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "status" "StatusOffense" NOT NULL DEFAULT 'Aguardando_investigar',
    "date_of_occurrence" TIMESTAMP NOT NULL,
    "case_number" INTEGER NOT NULL,
    "priority" "TypePriority" NOT NULL DEFAULT 'baixa',
    "witnesses" TEXT,
    "motivation" TEXT,
    "criminal_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "criminals_cpf_key" ON "criminals"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "criminals_rg_key" ON "criminals"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "criminals_criminal_record_key" ON "criminals"("criminal_record");

-- CreateIndex
CREATE UNIQUE INDEX "crimes_case_number_key" ON "crimes"("case_number");

-- CreateIndex
CREATE UNIQUE INDEX "guns_serial_number_key" ON "guns"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "guns_registration_code_key" ON "guns"("registration_code");

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_criminal_id_fkey" FOREIGN KEY ("criminal_id") REFERENCES "criminals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guns" ADD CONSTRAINT "guns_crimes_id_fkey" FOREIGN KEY ("crimes_id") REFERENCES "crimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
