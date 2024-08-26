/*
  Warnings:

  - You are about to drop the column `secretaria` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ocorrencias_cameras` ADD COLUMN `instituicao` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `secretaria`,
    ADD COLUMN `instituicao` VARCHAR(191) NULL;
