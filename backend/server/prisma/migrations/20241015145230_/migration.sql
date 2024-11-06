/*
  Warnings:

  - You are about to drop the `agenda_usuario_cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "agenda_usuario_cliente" DROP CONSTRAINT "agenda_usuario_cliente_agendaId_fkey";

-- DropForeignKey
ALTER TABLE "agenda_usuario_cliente" DROP CONSTRAINT "agenda_usuario_cliente_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "agenda_usuario_cliente" DROP CONSTRAINT "agenda_usuario_cliente_userId_fkey";

-- DropTable
DROP TABLE "agenda_usuario_cliente";

-- CreateTable
CREATE TABLE "agenda_cliente" (
    "id" SERIAL NOT NULL,
    "agendaId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "agenda_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_usuario" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "agendaId" INTEGER NOT NULL,

    CONSTRAINT "agenda_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agenda_cliente_agendaId_clienteId_key" ON "agenda_cliente"("agendaId", "clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "agenda_usuario_userId_agendaId_key" ON "agenda_usuario"("userId", "agendaId");

-- AddForeignKey
ALTER TABLE "agenda_cliente" ADD CONSTRAINT "agenda_cliente_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "agenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda_cliente" ADD CONSTRAINT "agenda_cliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda_usuario" ADD CONSTRAINT "agenda_usuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda_usuario" ADD CONSTRAINT "agenda_usuario_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "agenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
