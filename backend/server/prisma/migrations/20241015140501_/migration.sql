/*
  Warnings:

  - You are about to drop the `agenda_cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `agenda_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `integracao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "agenda_cliente" DROP CONSTRAINT "agenda_cliente_agendaId_fkey";

-- DropForeignKey
ALTER TABLE "agenda_cliente" DROP CONSTRAINT "agenda_cliente_empresa_configId_fkey";

-- DropForeignKey
ALTER TABLE "agenda_user" DROP CONSTRAINT "agenda_user_agendaId_fkey";

-- DropForeignKey
ALTER TABLE "agenda_user" DROP CONSTRAINT "agenda_user_userId_fkey";

-- DropForeignKey
ALTER TABLE "integracao" DROP CONSTRAINT "integracao_empresa_configId_fkey";

-- DropTable
DROP TABLE "agenda_cliente";

-- DropTable
DROP TABLE "agenda_user";

-- DropTable
DROP TABLE "integracao";

-- CreateTable
CREATE TABLE "agenda_usuario_cliente" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "agendaId" INTEGER NOT NULL,
    "clienteId" INTEGER,

    CONSTRAINT "agenda_usuario_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agenda_usuario_cliente_userId_agendaId_clienteId_key" ON "agenda_usuario_cliente"("userId", "agendaId", "clienteId");

-- AddForeignKey
ALTER TABLE "agenda_usuario_cliente" ADD CONSTRAINT "agenda_usuario_cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda_usuario_cliente" ADD CONSTRAINT "agenda_usuario_cliente_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "agenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda_usuario_cliente" ADD CONSTRAINT "agenda_usuario_cliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
