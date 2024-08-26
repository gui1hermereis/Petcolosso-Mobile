-- AlterTable
ALTER TABLE `visitas_adicionais` ADD COLUMN `extrangeiro` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `passaporte` VARCHAR(191) NULL;
