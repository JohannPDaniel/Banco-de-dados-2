-- CreateTable
CREATE TABLE "criminals" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "birthday" DATE NOT NULL,
    "recidivist" BOOLEAN NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "registeredAt" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "criminals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crimes" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "criminal_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guns" (
    "id" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "crimes_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "criminals_cpf_key" ON "criminals"("cpf");

-- AddForeignKey
ALTER TABLE "crimes" ADD CONSTRAINT "crimes_criminal_id_fkey" FOREIGN KEY ("criminal_id") REFERENCES "criminals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guns" ADD CONSTRAINT "guns_crimes_id_fkey" FOREIGN KEY ("crimes_id") REFERENCES "crimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
