-- AlterTable
ALTER TABLE `solicitacoes` ADD COLUMN `endereco` VARCHAR(191) NULL,
    ADD COLUMN `observacoes` VARCHAR(191) NULL,
    ADD COLUMN `regiao` VARCHAR(191) NULL,
    ADD COLUMN `bairro` VARCHAR(191) NULL;