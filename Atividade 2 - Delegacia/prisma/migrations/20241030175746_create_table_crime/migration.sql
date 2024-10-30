-- CreateEnum
CREATE TYPE "TypePriority" AS ENUM ('baixa', 'media', 'alta');

-- CreateEnum
CREATE TYPE "StatusOffense" AS ENUM ('Aguardando_investigar', 'Em_Andamento', 'Resolvido', 'Arquivado');

-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "status" "StatusOffense" NOT NULL DEFAULT 'Aguardando_investigar',
    "date_of_occurrence" TIMESTAMP NOT NULL,
    "case_number" CHAR(12) NOT NULL,
    "priority" "TypePriority" NOT NULL DEFAULT 'baixa',
    "witnesses" TEXT,
    "motivation" TEXT,
    "criminal_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crimes_case_number_key" ON "crimes"("case_number");

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_criminal_id_fkey" FOREIGN KEY ("criminal_id") REFERENCES "criminals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
