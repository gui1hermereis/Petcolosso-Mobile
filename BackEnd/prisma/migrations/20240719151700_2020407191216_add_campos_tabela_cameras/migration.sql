-- AlterTable
ALTER TABLE `cameras` ADD COLUMN `conferidoPor` VARCHAR(191) NULL,
    ADD COLUMN `dataConferenciaGravacao` DATETIME(3) NULL,
    ADD COLUMN `dataConferenciaProblema` DATETIME(3) NULL,
    ADD COLUMN `observacoes` TEXT NULL,
    ADD COLUMN `problema` VARCHAR(191) NULL,
    ADD COLUMN `tudoCerto` BOOLEAN NULL DEFAULT false;
