-- CreateTable
CREATE TABLE "criminals" (
    "id" UUID NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "rg" CHAR(9) NOT NULL,
    "criminal_record" VARCHAR(100) NOT NULL,
    "nationality" VARCHAR(100) NOT NULL,
    "gender" TEXT,
    "address" TEXT,
    "recidivist" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "criminals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "criminals_cpf_key" ON "criminals"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "criminals_rg_key" ON "criminals"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "criminals_criminal_record_key" ON "criminals"("criminal_record");
